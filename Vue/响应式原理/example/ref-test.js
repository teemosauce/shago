import { effect } from '../effect.js'
import { ref } from '../ref.js'


let flag = ref(true)

effect(() => {
    console.log("flag", flag.value)
})

setTimeout(() => {
    flag.value = false
}, 2000)
