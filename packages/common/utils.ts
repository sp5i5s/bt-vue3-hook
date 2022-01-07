import func from "./func";

// 将字符串格式转换成Object
export const __getStringToObject = function ($var) {
  if (func.__getVariableReferenceType($var)) {
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
  return promise(params)
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

// 将平铺的一维数组处理成标准的tree结构
export const array2tree = (
  arr,
  options = { parentDefaultValue: -1, parentKey: "parentKey" }
): any => {
  const tree: Array<any> = [];
  arr.forEach((item) => {
    if (item[options.parentKey] == options.parentDefaultValue) {
      const children = array2tree(
        arr.filter((v) => v[options.parentKey] !== options.parentDefaultValue),
        { parentDefaultValue: item.key, parentKey: options.parentKey }
      );
      if (children.length) {
        tree.push({ ...item, children });
      } else {
        tree.push({ ...item });
      }
    }
  });
  return tree;
};

// 将树平铺到顶层数组
export const tree2array = (list) => {
  let data = JSON.parse(JSON.stringify(list));
  function haveChildren(data, list) {
    for (let index in data) {
      if (data[index].children) {
        let dataChildRen = JSON.parse(JSON.stringify(data[index].children));
        delete data[index].children;
        if (dataChildRen && dataChildRen.length > 0) {
          list.push({ ...data[index] });
          haveChildren(dataChildRen, list);
        }
      } else {
        list.push({ ...data[index] });
      }
    }
    return list;
  }
  return haveChildren(data, []);
};
