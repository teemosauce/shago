function effect(fn, options = {}) {

    let effect = createReactiveEffect(fn, options)

    if (!options.lazy) {
        effect()
    }

    return effect
}
let effectStack = [] // 引用栈是为了解决effect套effect导致的问题
let activeEffect;
let uid = 0
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) {
            let result
            try {
                effectStack.push(effect)
                activeEffect = effect
                result = fn()
            } catch (error) {

            } finally {
                effectStack.pop() // 执行完之后把最后一个effect从栈中移除
                activeEffect = effectStack[effectStack.length - 1] // 然后把当前的effect回退为栈中的最后一个
            }
            return result
        }
    }
    effect.id = uid++
    effect._isEffect = true
    effect.raw = fn
    effect.options = options
    return effect
}

const targetDeps = new WeakMap()
// 收集依赖
function track(target, type, key) {
    
    if (activeEffect) {
        let setDeps = targetDeps.get(target)
        if (!setDeps) {
            setDeps = new Map()
            targetDeps.set(target, setDeps)
        }
        let deps = setDeps.get(key)
        if (!deps) {
            deps = []
            setDeps.set(key, deps)
        }
        if (!deps.includes(activeEffect)) {
            deps.push(activeEffect)
        }
        console.log(target, type, key, deps)
        // Reflect.set(target, `__${key}_deps`, deps)
    }
}

module.exports = {
    effect,
    track
}