import { isFunction, isArray, isIntegerKey } from "./utils.js";

export function effect(fn, options = {}) {
  if (!isFunction(fn)) {
    return fn;
  }
  let effect = createReactiveEffect(fn, options);

  if (!options.lazy) {
    effect();
  }

  return effect;
}
let effectStack = []; // 引用栈是为了解决effect套effect导致的问题
let activeEffect;
let uid = 0;
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      let result;
      try {
        effectStack.push(effect);
        activeEffect = effect;
        result = fn();
      } catch (error) {
      } finally {
        effectStack.pop(); // 执行完之后把最后一个effect从栈中移除
        activeEffect = effectStack[effectStack.length - 1]; // 然后把当前的effect回退为栈中的最后一个
      }
      return result;
    }
  };
  effect.id = uid++;
  effect._isEffect = true;
  effect.raw = fn;
  effect.options = options;
  return effect;
}

const targetMap = new WeakMap();
/**
 * 收集依赖
 * @param {Object} target 要收集依赖的对象
 * @param {String} type 类型
 * @param {String} key 对那个属性进行收集
 */
export function track(target, type, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      depsMap = new Map();
      targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
      deps = new Set();
      depsMap.set(key, deps);
    }
    if (!deps.has(activeEffect)) {
      deps.add(activeEffect);
    }
    // console.log(target, type, key, deps)
    // console.table(targetMap);
    // Reflect.set(target, `__${key}_deps`, deps)
  }
}

/**
 * 触发对应属性收集的依赖函数
 * @param {Object} target 触发那个对象
 * @param {String} type 类型
 * @param {String} key 触发那个对象下的属性
 * @param {any} value 设置的值
 * @param {any} oldValue 旧值
 */
export function trigger(target, type, key, newValue, oldValue) {
//   console.log("trigger", type, key);
  let depsMap = targetMap.get(target);
  //   如果属性没有收集过依赖 什么都不做
  if (!depsMap) {
    return;
  }

  let effectQueue = new Set();

  let add = (effects) => {
    if (effects) {
      effects.forEach((effect) => {
        effectQueue.add(effect);
      });
    }
  };

  //   先看修改的是不是数组的长度，因为改长度影响比较大
  if (isArray(target) && key === "length") {
    // 特殊处理 修改的是数组长度的情况
    depsMap.forEach((deps, key) => {
      // 如果更改的长度小于收集的索引 那么这个索引也需要触发effect重新执行 例如使用的是arr[2] 后来把arr.length = 1了
      if (key === "length" || key > newValue) {
        add(deps);
      }
    });
  } else {
    // 可能是对象
    if (key !== undefined) {
      // 这里肯定是更改， 不能是新增 新增取到的依赖为空 add那里有判断 加不进去
      add(depsMap.get(key));
    }

    // 如果修改的是数组的索引
    switch (type) {
      case "ADD":
        // 如果对数组添加了一个索引，那么触发长度的更新
        if (isArray(target) && isIntegerKey(key)) {
            add(depsMap.get('length'))
        }
        break;
      case "SET":
        break;
      default:
        break;
    }
  }

  effectQueue.forEach((effect) => {
    // console.log(effect);
    effect();
  });
}