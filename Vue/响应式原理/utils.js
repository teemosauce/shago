/**
 * 判断一个值是否为对象
 * @param {Object} obj
 * @returns
 */
const isObject = (obj) => typeof obj === "object" && obj !== null;

const isArray = Array.isArray;
const isFunction = (fn) => typeof fn === "function";

/**
 * 判断一个数字字符串是否为整数
 * @param {number} value
 * @returns
 */
const isIntegerKey = (value) => {
  return parseInt(value) + "" === value;
};

const hasChanged = (newValue, oldValue) => newValue !== oldValue;

module.exports = {
  isObject,
  isArray,
  isFunction,
  isIntegerKey,
  hasChanged,
};
