import Vue from "vue";
import ViewDesign from "view-design";
import "view-design/dist/styles/iview.css";
import App from "./app.vue";

Vue.use(ViewDesign)
new Vue({
    render(h) {
      return h(App);
    },
    el: "#app",
  });