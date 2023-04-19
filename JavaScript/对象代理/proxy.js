let obj = {
    a: 1,
    b: 2,
    c: {
        a: 1,
        b: 2
    },
    d: [1, 2]
}

function isObject(o) {
    return typeof o == 'object' && o !== null;
}

function reactive(obj) {
    if (!isObject(obj)) {
        return obj;
    }

    let proxy = new Proxy(obj, {
        get(target, key) {
            console.log(`获取${key}`)
            let value = Reflect.get(target, key)
            if (isObject(value)) {
                value = reactive(value)
            }
            return value
        },

        set(target, key, val) {
            console.log(`更改${key}：${val}`)
            Reflect.set(target, key, val)
        }
    })

    return proxy
}

let objProxy = reactive(obj)

objProxy.d.push(3)
console.log(objProxy.c.a)
console.log(obj)



