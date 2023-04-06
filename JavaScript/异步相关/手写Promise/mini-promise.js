const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED '
const REJECTED = 'REJECTED'


function runMicroTask(task) {
    process.nextTick(task)
}

function isPromise(promise) {
    return typeof promise == 'object' && typeof promise.then == 'function'
}

let id = 0
class MiniPromise {
    _id = id++
    _state = 'PENDING'
    _handlers = []
    _value = null
    constructor(executor) {
        executor(this._resolve.bind(this), this._reject.bind(this));
    }

    _resolve(result) {
        this.changeState(FULFILLED, result)
    }

    _reject(reason) {
        this.changeState(REJECTED, reason)
    }

    changeState(state, value) {
        if (state != PENDING) {
            this._state = state
            this._value = value
            this.runHandlers()
        }
    }

    then(onFulfilled, onRejected) {
        return new MiniPromise((resolve, reject) => {
            this.addHandler(FULFILLED, onFulfilled, resolve, reject)
            this.addHandler(REJECTED, onRejected, resolve, reject)
            this.runHandlers();
        })
    }

    addHandler(state, executor, resolve, reject) {
        this._handlers.push({
            state: state,
            executor: executor,
            resolve: resolve,
            reject: reject
        })
    }

    runHandlers() {
        if (this._state != PENDING) {
            while (this._handlers.length) {
                let handler = this._handlers.shift()
                this.runHandler(handler)
            }
        }
    }

    runHandler(handler) {
        if (this._state == handler.state) {
            runMicroTask(() => {
                try {
                    let any = handler.executor(this._value)
                    if (isPromise(any)) {
                        any.then(handler.resolve, handler.reject)
                    } else {
                        this._state == FULFILLED ? handler.resolve(this._value) : handler.reject(this._value)
                    }
                } catch (error) {
                    handler.reject(error)
                }
            })
        }
    }
}




// 基本用法
function main() {
    let promise = new MiniPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, 1000)
    })

    promise.then((result) => {
        console.log('result1', result)
        return Promise.resolve("go")
    }, error => {
        console.error(error)
    }).then(result => {
        console.log('result2', result)
    })
}

main()