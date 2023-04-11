let obj = {
    id: 1
}

Object.defineProperty(obj, 'name', {
    configurable: false,
    enumerable: false, // 遍历时是否可枚举
    _v: undefined,
    get() {
        return this._v
    },
    set(v) {
        this._v = v
    }
})

console.log(obj.hasOwnProperty('name'))

console.log('name' in obj)

console.log(Object.keys(obj))


for(var key in obj) {
    console.log(key)
}

