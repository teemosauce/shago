
// 浮点数运算
// 原理就是将浮点数先放大N倍换算成整数运算 最后再缩小相应的倍数

/**
 * 乘法运算
 * @param x 
 * @param y 
 */
function mul(x, y) {
    x = parseFloat(x)
    y = parseFloat(y)

    console.log(`x=${x}, y=${y}`)
    // 把浮点数运算转换成整数运算 

    // 计算两个数据小数点后面的总位数
    let n = [x, y].reduce((count, item) => {
        item = item.toString()
        if (item.includes('.')) {
            count += item.split('.')[1].length // 获取y小数点后面的位数
        }
        return count
    }, 0)

    return Number(x.toString().replace('.', '')) * Number(y.toString().replace('.', '')) / Math.pow(10, n)
}


/**
 * 精确加法运算
 * @param x 
 * @param y 
 */
function add(x, y) {
    x = parseFloat(x)
    y = parseFloat(y)


    let [l1, l2] = [x, y].map(item => {
        let len = 0
        item = item.toString()
        if (item.includes('.')) {
            len = item.split('.')[1].length // 获取y小数点后面的位数
        }
        return len
    })

    let p = Math.pow(100, Math.max(l1, l2)) // 返回100 的 小数点较长长度的次方

    return (mul(x, p) + mul(y, p)) / p
}

// console.log(a + b) // 直接使用加法结果不是0.3 会造成精度问题 这在计算订单价格时会有问题

// add(0.001, 0.002)

let a = 0.1
let b = 0.2


console.log(`${a}*${b}=${a * b}`)
console.log(`${a}*${b}=${mul(a, b)}`)
console.log(`${a}+${b}=${a + b}`)
console.log(`${a}+${b}=${add(a, b)}`)

// 一些开源的解决方案
// 1.math.js

// 2.number-precision

// 3.bigDecimal.js

// 4.bigNumber.js

