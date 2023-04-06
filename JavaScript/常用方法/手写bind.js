// 自定义bind方法
Function.prototype.customBind = function () {
    console.log('调用自定义的bind方法')
    let args = Array.prototype.slice.call(arguments)
    let target = args.shift()
    let method = this
    return function () {
        let newArgs = Array.prototype.slice.call(arguments)
        return method.apply(target, args.concat(newArgs));
    }
}

a = 1

// 求和的方法 加上一个a的值
function add() {
    let args = Array.prototype.slice.call(arguments)
    return this.a + args.reduce((total, current) => {
        return total + current
    }, 0)
}

let obj = {
    a: 10
}



function main() {
    console.log(add(1, 2, 3))
    console.log(add.bind(obj, 1)(2, 3))
    console.log(add.customBind(obj, 1)(2, 3))
}


main()