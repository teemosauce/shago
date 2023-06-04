
// 机器人
export default class Robot {
    tag = "Robot";
    constructor(name) {
      this.name = name;
    }
  
    getName() {
      return this.name;
    }
  
    toString() {
      return `${this.tag}:${this.name}`
    }
  }
  