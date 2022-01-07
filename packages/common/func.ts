const func = {
  // 获取变量类型
  __getVariableType(val) {
    return Object.prototype.toString.call(val);
  },
  // 判断当前变量是否是引用类型
  __getVariableReferenceType(val) {
    return ["[object Array]", "[object Object]"].includes(
      this.__getVariableType(val)
    );
  },
  // isArray 判断数组
  isArray(val) {
    return toString.call(val) === "[object Array]";
  },
  // 判断Undefined
  isUndefined(val) {
    return typeof val === "undefined";
  },
  // 判断 buffer
  isBuffer(val) {
    return (
      val !== null &&
      !this.isUndefined(val) &&
      val.constructor !== null &&
      !this.isUndefined(val.constructor) &&
      typeof val.constructor.isBuffer === "function" &&
      val.constructor.isBuffer(val)
    );
  },
  // 判断FormData
  isFormData(val) {
    return typeof FormData !== "undefined" && val instanceof FormData;
  },
  // 判断对象
  isObject(val) {
    return val !== null && typeof val === "object";
  },
  //  判断 纯对象
  isPlainObject(val) {
    if (Object.prototype.toString.call(val) !== "[object Object]") {
      return false;
    }

    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  },
  // 判断Date
  isDate(val) {
    return Object.prototype.toString.call(val) === "[object Date]";
  },
  // 判断文件类型
  isBlob(val) {
    return Object.prototype.toString.call(val) === "[object Blob]";
  },
  // 判断函数
  isFunction(val) {
    return Object.prototype.toString.call(val) === "[object Function]";
  },
  // 判断是否是流
  isStream(val) {
    return this.isObject(val) && this.isFunction(val.pipe);
  },
  //  判断URLSearchParams
  isURLSearchParams(val) {
    return (
      typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams
    );
  },
};

export default func;
