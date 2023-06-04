import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "@captain/shared/styles/common.scss";


let app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
