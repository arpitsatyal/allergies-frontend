import './index.css'
import "ant-design-vue/dist/antd.css";
import "vue-toastification/dist/index.css";

import { createApp } from "vue";
import Antd from "ant-design-vue";
import Toast from "vue-toastification";

import App from "./App.vue";
import store from "./store/index";
import router from "./router/index";

const app = createApp(App);

app
.use(router)
.use(store)
.use(Antd)
.use(Toast)
.mount("#app");


