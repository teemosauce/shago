const { effect } = require('../effect.js')
const { ref } = require('../ref.js')


let flag = ref(true)

effect(() => {
    console.log("flag", flag.value)
})

setTimeout(() => {
    flag.value = false
}, 2000)
