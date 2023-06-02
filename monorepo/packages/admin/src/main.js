import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./app.vue";
Vue.use(ElementUI)
new Vue({
    render(h) {
      return h(App);
    },
    el: "#app",
  });