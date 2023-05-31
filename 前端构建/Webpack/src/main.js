import { getDate } from "@/utils";

import "@/style/common.scss";

import content from "./what.abc";

import icon from "@/assets/images/icon.jpeg";

// import Vue from 'vue'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// import App from '@/vue/app.vue'
// import router from '@/vue/router'
// 开发环境才需要use 生产环境引用CDN资源

// Vue.use(ElementUI)
// if (process.env.NODE_ENV !== 'production') {
//     // 如果用了CDN的资源 这里就不能再使用use了 因为ElementUI和暴露再window上的对象名称不一样 会报ElementUI未定义的错误
//     Vue.use(ElementUI)
// }

console.log(process.env);
function printDate() {
  console.log(getDate() + 1110);
}

function bootstrap() {
  printDate();

  document.onreadystatechange = (ev) => {
    console.log(ev);
  };

  window.onload = (e) => {
    document.getElementById("title").addEventListener("click", (e) => {
      e.target.innerText = `通过一个自定义的loader获取一个特殊文件里面的内容${content}`;
    });

    let img = document.createElement("img");
    img.src = icon;

    document.querySelector('.container').appendChild(img);

    let image = new Image(100, 100);
    image.src = icon;

    document.querySelector('.container').appendChild(image);
    image.onload = function (e) {
      console.log("----------");
    };
  };

  // new Vue({
  //     router,
  //     render(h) {
  //         return h(App)
  //     },
  //     el: '#vueApp'
  // })
}

bootstrap();
