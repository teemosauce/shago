const { effect } = require('../effect')
const { reactive, readonlyReactive, shadowReactive, shadowReadonlyReactive } = require('../reactive')

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
    obj.a
    // effect(()=> {
    //     console.log(obj.c.a)
    // })
})

effect(function render4() {
    obj.a
    // effect(()=> {
    //     console.log(obj.c.a)
    // })
})


effect(function render3() {
    obj.c.a
    // effect(()=> {
    //     console.log(obj.c.a)
    // })
})

effect(function render2() {
    obj.b
    // effect(()=> {
    //     console.log(obj.c.a)
    // })
})

// console.log(obj.__a_deps.length)

// 浅代理测试
// let obj = shadowReactive(o)



// obj.d.length = 10
// console.log(obj)



// let obj2 = reactive([1, 2, 3])

// obj2.push(1)
// console.log(obj2)