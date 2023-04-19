

let a = require('./a.js')

console.log(a)

module.exports = {
    say() {
        console.log("b.say()")
        a.say()
    }
}