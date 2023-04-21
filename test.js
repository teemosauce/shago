function log(fn, descriptor) {
    let { name } = descriptor
    return function (...args) {
        console.log("调用了", this, name, args)
        return fn.apply(this, args)
    }
}

class Person {
    constructor(name) {
        this.name = name
    }
    @log
    hello() {
        console.log(`${this.name} say hello`)
    }
}


new Person("小明").hello("gogogo")


