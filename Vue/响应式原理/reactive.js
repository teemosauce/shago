
import { handler, shadowHandler, readonlyHandler, shadowReadonlyHandler } from "./handlers.js"
import { isObject } from "./utils.js"

// 四种创建代理的方法

export const reactive = createReactive(false, handler)
export const shadowReactive = createReactive(false, shadowHandler)
export const readonlyReactive = createReactive(true, readonlyHandler)
export const shadowReadonlyReactive = createReactive(true, shadowReadonlyHandler)

// function reactive(target) {
//     return createReactive(target, false, handler)
// }

// function shadowReactive(target) {
//     return createReactive(target, false, shadowHandler)
// }


// function readonlyReactive(target) {
//     return createReactive(target, true, readonlyHandler)
// }


// function shadowReadonlyReactive(target) {
//     return createReactive(target, true, shadowReadonlyHandler)
// }



const reactiveMap = new WeakMap()
const readonlyReactiveMap = new WeakMap()

function createReactive(readonly, handler) {
    return function reactive(target) {
        //  不是对象的话直接返回
        if (!isObject(target)) {
            return target
        }
        let proxyMap = readonly ? readonlyReactiveMap : reactiveMap
        // 如果已经代理过 直接返回代理过的对象
        let proxy = proxyMap.get(target)
        if (!proxy) {
            proxy = new Proxy(target, handler)
            proxyMap.set(target, proxy)
        }
        return proxy
    }
}

// 利用这种方式解决递归依赖问题 或者是module.exports提升到最开始
// exports.reactive = reactive
// exports.shadowReactive = shadowReactive
// exports.readonlyReactive = readonlyReactive
// exports.shadowReadonlyReactive = shadowReadonlyReactive
