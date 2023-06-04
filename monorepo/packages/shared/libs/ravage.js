// 机器狗
import Robot from "./robot";

export default class Ravage extends Robot {
  constructor(name, color) {
    super(name)
    this.color = color
  }

  getColor() {
    return this.color
  }

  toString() {
    return `${super.toString()}:${this.color}`
  }

  crawl() {
    console.log(`${this.toString()}可以爬行`);
  }
}
