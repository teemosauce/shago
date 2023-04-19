/**
 * 判断一个值是否为对象
 * @param {Object} obj 
 * @returns 
 */
const isObject = (obj) => typeof obj === 'object' && obj !== null

const isArray = Array.isArray

/**
 * 判断一个数是否为整数
 * @param {number} value 
 * @returns 
 */
const isInteger = (value) => {
    return parseInt(value) + '' == value
}


module.exports = {
    isObject,
    isArray,
    isInteger
}