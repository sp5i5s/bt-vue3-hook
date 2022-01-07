import * as utils from "../common/utils";
import { sysEnum } from "../common/enum";

interface iOptions {
  // 缓存Key
  key: string;
  // promise Fn函数
  promiseFn: Function;
  // 异步所需要的接口，通常是Api接口参数
  params?: object;
  //  是否开启,自动更新时间
  updateTime?: number;
  // Storage的存储类型
  session?: string;
}

let session = window.sessionStorage;

const updateTimeHandle = (key: string) => {};

// 异步获取远程数据并缓存到Cache，减少接口的重复消耗
export const useCache = async (options: iOptions) => {
  if (options?.session == "localStorage") {
    session = window.localStorage;
  }
  options.key = sysEnum.cachePrefix + options.key;
  let result = session.getItem(options.key);
  if (!session.getItem(options.key)) {
    if (options.promiseFn) {
      let promiseResult = await utils.promiseHandle(
        options.promiseFn,
        options.params || {}
      );
      result = JSON.stringify({
        source: promiseResult,
        created: new Date().getTime(),
      });
      session.setItem(options.key, result as string);
    }
  }

  // 将格式化后的字符串进行反解
  let sourceFormatObject = utils.__getStringToObject(result);
  // 判断是否开启了自动更新
  if (options?.updateTime) {
    // 如果最后创建时间+约定的时差 < 系统当前时间，则删除缓存，以待下次自动更新
    if (
      sourceFormatObject.created + options.updateTime <
      new Date().getTime()
    ) {
      session.removeItem(options.key);
    } else {
      // 如果未到期，将自动续期
      // sourceFormatObject.created = new Date().getTime();
      // session.setItem(options.key, JSON.stringify(sourceFormatObject));
    }
  }

  return {
    result: utils.__getStringToObject(sourceFormatObject.source),
  };
};
