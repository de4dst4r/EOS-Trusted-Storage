import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
app.use(router);
app.use(Antd);
app.use(pinia);
app.mount('#app');