# JS中new的操作过程

1. 先创建一个空对象。
2. 将该对象的原型 `__proto__` 指向构造函数的原型`prototype。`
3. 使用该对象执行构造函数，将构造函数的 `this `指向该对象。
4. 如果构造函数有返回值且是个对象且不为 `null `，则返回该对象，否则返回创建的那个对象。



```javascript
// 传递构造函数 生成一个对象

function newObject() {

  let args = [...arguments]

  let constructor = args.shift() // 获取第一个参数为构造函数

  if (typeof constructor != 'function') {

​    throw 'newObject方法的第一个参数需要是构造函数'

  }

  let obj = {};

  obj.__proto__ = constructor.prototype;

  let result = constructor.apply(obj, args);

  return (result && typeof result == 'object') ? result : obj;

}

// 示例

function Person(name) {

  this.name = name

}

Person.prototype.say = function () {

  console.log(`我的名字是${this.name}`)

}

let p = newObject(Person, '小白兔')

console.log(p)

let p1 = new Person('大灰狼')

console.log(p1)
```

