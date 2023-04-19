const { effect } = require('../effect')
const { reactive, readonlyReactive, shadowReactive, shadowReadonlyReactive } = require('../reactive')

// 响应式原理 总结起来就是这两句话
// 1.调用effect函数时 传递的函数就相当于render函数， render函数中的所有属性都会收集该effect
// 2. 当属性值发生变化时，该属性收集的所有effect都会重新执行

let o = {
    a: 1,
    b: 2,
    c: {
        a: 1
    },
    d: [1, 2, 3]
}
// 深代理测试
let obj = reactive(o)
// obj.c.a 获取c和a都有反应

effect(function render1() {
    // console.log(`我是${JSON.stringify(obj.d)}`)
    console.log(`我是${obj.kk}`)
})

obj.kk = 10
obj.kk = 1100

// obj.kkk = "1200"

// effect(function render4() {
//     obj.a
//     // effect(()=> {
//     //     console.log(obj.c.a)
//     // })
// })


// effect(function render3() {
//     obj.c.a
//     // effect(()=> {
//     //     console.log(obj.c.a)
//     // })
// })

// effect(function render2() {
//     obj.b
//     // effect(()=> {
//     //     console.log(obj.c.a)
//     // })
// })

// console.log(obj.__a_deps.length)

// 浅代理测试
// let obj = shadowReactive(o)



// obj.d.length = 10
// console.log(obj)



// let obj2 = reactive([1, 2, 3])

// obj2.push(1)
// console.log(obj2)