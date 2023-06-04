export const VERSION = "Framework-Vue:1.0.0";
export const proxyInstall = (Vue) => {
  let install = Vue.install;

  Vue.install = function (plugin) {
    console.log(`安装了插件：${plugin.name || "未知插件"}`);
    install.apply(Vue, [plugin]);
  };
};
