import "core-js/stable"

// require("core-js/proposals")

// 采用usage时，这个会垫平很多的方法

import { query } from "./utils";

import { Dog } from "./libs/dog";
import { Cat } from "./libs/cat";

const name = "王大锤";

const mixins = {
  say: () => {
    console.log(`${person.name}的偶像是${person.idols.join(",")}!`);
  },
};

let person = {
  name,
  idols: ["刘德华", "郭富城", "张学友", "黎明", ["周星驰", "周润发"]],
  ...mixins,
};

async function bootstrap() {
  person.say();
  console.log(person.idols.flat());

  let list = [
    {
      id: 1,
      age: 8,
      name: "张家辉",
      sex: "男",
    },
    {
      id: 2,
      age: 3,
      name: "王菲",
      sex: "女",
    },
    {
      id: 5,
      age: 6,
      name: "郭富城",
      sex: "男",
    },
    {
      id: 4,
      age: 2,
      name: "刘德华",
      sex: "男",
    },
    {
      id: 6,
      age: 4,
      name: "张曼玉",
      sex: "女",
    },
    {
      id: 3,
      age: 5,
      name: "周杰伦",
      sex: "男",
    },
  ];
  query(list)
    .where((item) => item.age > 5)
    .sortBy("age")
    .groupBy("sex")
    .execute();

  new Dog().say();

  new Cat().say();
}

bootstrap();
