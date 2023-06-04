function query(arr) {
  let arrProto = Array.prototype;
  if (!arrProto.where) {
    arrProto.where = function (fn) {
      return this.filter(fn);
    };
  }

  if (!arrProto.execute) {
    arrProto.execute = function () {
      console.log(this);
    };
  }

  if (!arrProto.sortBy) {
    arrProto.sortBy = function (key) {
      return this.sort((x, y) => {
        return x[key] > y[key] ? 1 : -1;
      });
    };
  }

  if (!arrProto.groupBy) {
    arrProto.groupBy = function (key) {
      let map = new Map();
      this.forEach((item) => {
        if (!map.has(item[key])) {
          map.set(item[key], []);
        }
        map.get(item[key]).push(item);
      });

      let result = [];
      map.forEach((value) => {
        result.push(value);
      });

      return result;
    };
  }

  return arr;
}

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
