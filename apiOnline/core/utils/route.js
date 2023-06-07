let a = new Map()

a.set("b", 10)
a.set("c", 20)
for(let key of a.keys()) {
    console.log(key)
    if (key == 'b') {
        break
    }
} 