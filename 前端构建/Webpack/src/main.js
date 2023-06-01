import { getDate } from "@/utils";

import "@/style/common.scss";
import "@/style/iconfont.css";

import content from "./what.abc";

import icon30 from "@/assets/images/icon.jpg";
import icon300 from "@/assets/images/icon.jpeg";

import Vue from "vue";

// import ElementUI from "element-ui";

import {
  Button,
  Form,
  Image,
  Footer,
  Alert,
  Aside,
  Autocomplete,
  Badge,
  DatePicker,
  Calendar,
  Empty,
  Dialog,
  DropdownItem,
} from "element-ui";

// import Button from "element-ui/packages/button/index";
// import Form from "element-ui/packages/form/index";
// import Image from "element-ui/packages/image/index";

import "element-ui/lib/theme-chalk/index.css";

import App from "@/vue/app.vue";
import router from "@/vue/router";
// 开发环境才需要use 生产环境引用CDN资源

// if (process.env.NODE_ENV !== 'production') {
//     // 如果用了CDN的资源 这里就不能再使用use了 因为ElementUI和暴露再window上的对象名称不一样 会报ElementUI未定义的错误
//     Vue.use(ElementUI)
// }

console.log(process.env);
function printDate() {
  console.log(getDate() + 1110);
}

function bootstrap() {
  mountSingle();

  mountVue();
}

function mountSingle() {
  printDate();

  document.onreadystatechange = (ev) => {
    console.log(ev);
  };

  window.onload = (e) => {
    document.getElementById("title").addEventListener("click", (e) => {
      e.target.innerText = `通过一个自定义的loader获取一个特殊文件里面的内容${content}`;
    });

    console.log("icon30", icon30);
    console.log("icon300", icon300);
    let img = document.createElement("img");
    img.src = icon30;

    let container = document.querySelector(".container");

    container.appendChild(img);

    let image = new Image(100, 100);
    image.src = icon300;

    container.appendChild(image);
    image.onload = function (e) {
      console.log("----------");
    };

    let dom = document.createElement("i");
    dom.classList.add("iconfont", "icon-shanchu");
    container.append(dom);
  };
}

function mountVue() {
  //   Vue.use(ElementUI);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(Image);
  //   Vue.use(Dialog)
  new Vue({
    router,
    render(h) {
      return h(App);
    },
    el: "#vueApp",
  });
}

bootstrap();
