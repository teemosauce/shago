export const query = function (arr) {
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
};


export const add = function(x, y) {
  return x + y
}

export class Car {

}

export default {
  query,
  add,
  Car
}