const { track, trigger } = require("./effect");
const { isArray, isObject, hasChanged, isIntegerKey } = require("./utils");

const get = createGetter(); // 深度代理的读方法
const shadowGet = createGetter(true); // 浅代理读方法
const readonlyGet = createGetter(false, true); // 深度代理只读
const shadowReadonlyGet = createGetter(true, true); // 浅代理只读

const set = createSetter();
const shadowSet = createSetter(true);
const readonlySet = function (target, key, value) {
  console.warn("禁止修改只读代理");
};

// 依赖的结构 某个对象的某个key的依赖数组
// {
//     {a: 1, b:2}: {
//         a: [effect1, effect2]
//     }
// }

/**
 * 创建get方法
 * @param {boolean} shadow 是否浅代理
 * @param {readonly} shadow 是否只读
 */
function createGetter(shadow = false, readonly = false) {
  // 拦截get
  return function get(target, key, receiver) {
    let result = Reflect.get(target, key, receiver); // 利用反射技术获取对象的属性值
    if (!readonly) {
      // 如果不是只读的 那么需要收集依赖，等数据变化时，通知收集的依赖依次执行
      track(target, "GET", key);
    }
    if (shadow) {
      // 如果是浅层代理 则直接返回
      return result;
    }
    // 如果是深层代理 则需要根据是否为对象类型 递归代理
    let { reactive, readonlyReactive } = require("./reactive");
    if (isObject(result)) {
      // 这里就能体现出Proxy相比Object.defineProperty的好处 这里只有当用到某属性的时候才会把某个属性变成响应式
      // 而defineProperty是一开始就遍历整个data数据，递归的把每一个属性都变成了响应式
      return readonly ? readonlyReactive(result) : reactive(result);
    }
    return result;
  };
}

/**
 * 创建set方法
 * @param {boolean} shadow 是否浅代理
 */
function createSetter(shadow = false) {
  // 设置拦截
  return function set(target, key, value, receiver) {
    // 当数据更新时，通知对应属性的effect重新执行
    let oldValue = Reflect.get(target, key, receiver);

    let hasKey = true;
    if (
      (isArray(target) && isIntegerKey(key) && Number(key) < target.length) ||
      target.hasOwnProperty(key)
    ) {
      // 是数组 并且是通过索引需修改数组的项 并且索引小于当前数组的长度
      hasKey = true; // 修改
    } else {
      hasKey = false; // 新增
    }
    console.log(`把${key}从${oldValue}改成了${value}`);
    let result = Reflect.set(target, key, value, receiver);

    if (!hasKey) {
      trigger(target, "ADD", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "SET", key, value, oldValue);
    }

    return result;
  };
}

module.exports = {
  handler: {
    get,
    set: set,
  },
  shadowHandler: {
    get: shadowGet,
    set: shadowSet,
  },
  readonlyHandler: {
    get: readonlyGet,
    set: readonlySet,
  },
  shadowReadonlyHandler: {
    get: shadowReadonlyGet,
    set: readonlySet,
  },
};
