let obj = {
    name: '小萝卜',
    info: {
        sex: '男',
        age: 18
    },
    tel: 13718716860
}


let { name, info, ...other} = obj;
console.log(name)

info.age = 1000
console.log(info)
other.tel = 110
console.log(other)
console.log(obj)