/**
 * 把一个树形结构展开成数组
 * @param {Array|Object} tree 树结构
 */
function flatten(tree) {
  tree = Array.isArray(tree) ? tree : [tree];

  let queue = [...tree];
  let arr = [];
  while (queue.length) {
    let item = queue.shift();
    if (Array.isArray(item.children) && item.children.length > 0) {
      queue = item.children.concat(queue);
    }
    delete item.children;
    arr.push(item);
  }
  return arr;
}

/**
 * 把一个数组转化成树结构的形式 根节点的父ID默认为0
 * @param {Array} array 数组
 */
function arrayToTree(array) {
  let map = {
    0: {
      children: [],
    },
  };
  let tree = [];
  array.forEach((item) => {
    let pid = item.pid;
    let id = item.id;

    if (!map[id]) {
      map[id] = {
        children: [],
      };
    }

    map[id] = {
      ...item,
      children: map[id].children,
    };

    if (!map[pid]) {
      map[pid] = {
        children: [],
      };
    }
    map[pid].children.push(map[id]);
  });
  console.log(map);
  return map[0].children;
}

let tree = {
  id: 1,
  pid: 0,
  name: "用户管理",
  children: [
    {
      id: 2,
      pid: 1,
      name: "用户列表",
      children: [
        {
          id: 4,
          pid: 2,
          name: "未付费用户",
        },
        {
          id: 5,
          pid: 2,
          name: "付费用户",
        },
      ],
    },
    {
      id: 3,
      pid: 1,
      name: "用户详细",
    },
  ],
};

function main() {
  console.log("原始树结构", tree);
  let array = flatten(tree);
  console.log("扁平化后的树结构")
  console.table(array);

  let newTree = arrayToTree(array);
  console.log("重新构造后的树", JSON.stringify(newTree));
}

main();
