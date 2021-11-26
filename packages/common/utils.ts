// 获取变量类型
export const __getVariableType = function ($var: any) {
  return Object.prototype.toString.call($var);
};

// 判断当前变量是否是引用类型
export const __getVariableReferenceType = function ($var) {
  return ["[object Array]", "[object Object]"].includes(
    __getVariableType($var)
  );
};

// 将字符串格式转换成Object
export const __getStringToObject = function ($var) {
  if (__getVariableReferenceType($var)) {
    return $var;
  } else {
    if (
      // 对于引用类型的规则判断条件
      $var.toString().search(/^\[\{/) > -1 ||
      $var.toString().search(/^\{/) > -1
    ) {
      return JSON.parse($var);
    }
    return $var;
  }
};

// 统一处理Promise
export const promiseHandle = (promise: Function, params: object): any => {
  console.log('params', params)
  return promise(params)
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};