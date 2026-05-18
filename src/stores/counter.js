// 1. 引入定义仓库的方法
import { defineStore } from 'pinia'
// 2. 定义仓库（第一个参数是唯一 ID）
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: [1,2,3,4,5,6,7,8,9],  // 数据
    weaponPackage:[
        
        {wpName:"离火扇",wpPrice:198,url:new URL('@/assets/images/exmp.png', import.meta.url).href},
        {wpName:"2021全球冠军赛",wpPrice:298,url:new URL('@/assets/images/exmp.png', import.meta.url).href},
        {wpName:"2023全球冠军赛",wpPrice:298,url:new URL('@/assets/images/exmp.png', import.meta.url).href},
        {wpName:"2024全球冠军赛",wpPrice:298,url:new URL('@/assets/images/exmp.png', import.meta.url).href},
        {wpName:"VTC爪刀",wpPrice:298,url:new URL('@/assets/images/exmp.png', import.meta.url).href},
        {wpName:"VTC2026篆刀",wpPrice:298,url:new URL('@/assets/images/exmp.png', import.meta.url).href},
        {wpName:"VTC怜悯之刃",wpPrice:298,url:new URL('@/assets/images/exmp.png', import.meta.url).href},
        {wpName:"怜悯2026",wpPrice:298,url:new URL('@/assets/images/exmp.png', import.meta.url).href},

    ]
  }),

  // 计算属性
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
  },

  // 方法（修改 state）
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
})