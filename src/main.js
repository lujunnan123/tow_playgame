import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import {createPinia} from 'pinia'
//  引入全局样式（关键）
import './assets/css/global.css'
import 'element-plus/dist/index.css'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
