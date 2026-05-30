import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//  引入全局样式（关键）
import './assets/css/global.css'
import 'element-plus/dist/index.css'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 持久化

app.use(pinia)
app.use(ElementPlus)
app.use(router)

app.mount('#app')
