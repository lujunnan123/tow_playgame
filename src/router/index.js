// 1. 引入路由
import { createRouter, createWebHashHistory } from 'vue-router'

// 2. 引入你的页面
import Home from '@/assets/pages/wwqyPrice.vue'
import Pconfig from '@/assets/pages/Price_config.vue'

// 3. 配置路由规则
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Pconfig',
    name: 'Pconfig',
    component: Pconfig
  }
]

// 4. 创建路由实例
const router = createRouter({
  // 本地部署必用 hash 模式，不会跨域、不会404
  history: createWebHashHistory(),
  routes
})

// 5. 导出
export default router