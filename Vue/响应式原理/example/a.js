
module.exports = {
    say() {
        console.log("a.say()")
    }
}
let { say } = require('./b.js')

say()

