const routers = [require("./user"), require("./file")];
module.exports = {
  /**
   * 把所有的路由挂载到app实例上
   * @param {*} app
   */
  mount(app) {
    routers.forEach((router) => {
      app.use(router);
    });
  },
};
