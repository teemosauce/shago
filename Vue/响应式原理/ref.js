const { reactive } = require("./reactive")

function ref(value) {
    let obj = {
        value
    }
    return reactive(obj)
}

module.exports = {
    ref
}