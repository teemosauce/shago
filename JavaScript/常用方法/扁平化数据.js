// 给定一个N维数据，将所有的数据项转换为一维数组

/**
 * 第一种 采用递归的方式
 * 
 * @param {Array} arr 多维数据
 * @returns 
 */
function flatten(arr) {
    return arr.reduce((newArr, current) => {
        return newArr.concat(Array.isArray(current) ? flatten(current) : current)
    }, [])
}

/**
 * 第二种 采用循环的方式
 * @param {Arr} arr 多维数据
 * @returns 
 */
function flatten2(arr) {
    let queue = [...arr]
    let newArr = []
    while (queue.length) {
        let item = queue.shift()
        if (Array.isArray(item)) {
            queue = item.concat(queue)
        } else {
            newArr.push(item)
        }
    }

    return newArr
}




function main() {
    let arr = [1, 2, [3], [4, 5], [[6, 7], [8], [[9], 10, 11]], [[[[[[[[[[[[12]], [13]]]]]], [14]]]], [15]]]]
    console.log('源数组', arr)

    console.time('递归用时')
    let newArr = flatten(arr)
    console.log('扁平化后的数组(递归法)', newArr)
    console.timeEnd('递归用时')

    console.time('循环用时')
    let newArr2 = flatten(arr)
    console.log('扁平化后的数组（循环法）', newArr2)
    console.timeEnd('循环用时')
}


main()