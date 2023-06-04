import Vue from "vue";
import { proxyInstall, VERSION } from "@captain/framework-vue";
proxyInstall(Vue);
console.log(`FrameworkVue.VERSION:${VERSION}`);

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@captain/shared/styles/common.scss";
import App from "./app.vue";
Vue.use(ElementUI);
new Vue({
  render(h) {
    return h(App);
  },
  el: "#app",
});
