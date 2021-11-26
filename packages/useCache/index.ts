import * as utils from "../common/utils";

interface iCache {
  key: string;
  promise: Function;
}

const session = window.sessionStorage;

export const useCache = async (options: iCache) => {
  console.log(options);
  let result = session.getItem(options.key);
  if (!session.getItem(options.key)) {
    if (options.promise) {
      result = await utils.promiseHandle(options.promise);
      // 如果是引用类型
      if (utils.__getVariableReferenceType(result)) {
        result = JSON.stringify(result);
      }
      session.setItem(options.key, result);
    } else {
      throw new Error("cache Key不存在，也没有相应的Promise");
    }
  }
  return {
    result: utils.__getStringToObject(result),
  };
};
