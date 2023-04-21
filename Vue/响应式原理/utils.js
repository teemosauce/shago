/**
 * 判断一个值是否为对象
 * @param {Object} obj
 * @returns
 */
export const isObject = (obj) => typeof obj === "object" && obj !== null;

export const isArray = Array.isArray;
export const isFunction = (fn) => typeof fn === "function";

/**
 * 判断一个数字字符串是否为整数
 * @param {number} value
 * @returns
 */
export const isIntegerKey = (value) => {
  return parseInt(value) + "" === value;
};

export const hasChanged = (newValue, oldValue) => newValue !== oldValue;
