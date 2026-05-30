// 1. 引入定义仓库的方法
import { defineStore } from 'pinia'
// 2. 定义仓库（第一个参数是唯一 ID）
export const useCounterStore = defineStore('counter', {
  state: () => ({
    rateObj: [
      {RateName:"元/源晶",Rate:0.1},
      {RateName:"不可实名倍率",Rate:0.85},
      {RateName:"区间倍率",Rate:0.35}
    ],  // 数据
    weaponPackage:[
        
        {wpName:"2021全球冠军赛",wpPrice:500,url:new URL('@/assets/images/weapon/21.png', import.meta.url).href},
        {wpName:"2022全球冠军赛",wpPrice:50,url:new URL('@/assets/images/weapon/22.png', import.meta.url).href},
        {wpName:"2023全球冠军赛",wpPrice:200,url:new URL('@/assets/images/weapon/23.png', import.meta.url).href},
        {wpName:"2024全球冠军赛",wpPrice:300,url:new URL('@/assets/images/weapon/24.png', import.meta.url).href},
        {wpName:"2025全球冠军赛",wpPrice:50,url:new URL('@/assets/images/weapon/25.jpg', import.meta.url).href},
        {wpName:"离火扇",wpPrice:50,url:new URL('@/assets/images/weapon/离火刃.png', import.meta.url).href},
        {wpName:"VTC 2025爪刀",wpPrice:50,url:new URL('@/assets/images/weapon/VTC25 爪刀.png', import.meta.url).href},
        {wpName:"VTC 2026篆刀",wpPrice:50,url:new URL('@/assets/images/weapon/VTC26 篆刀.png', import.meta.url).href},
        {wpName:"怜悯之刃",wpPrice:50,url:new URL('@/assets/images/weapon/怜悯之刃.png', import.meta.url).href},

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
    // 价格修改
    updatewPrice(index,num) {
      // console.log("123");      
      this.weaponPackage[index].wpPrice = num;
      // console.log("价格修改成功："+this.weaponPackage[index].wpPrice);      
    },
    updatewName(index,str) {
      // console.log("123");      
      this.weaponPackage[index].wpName = str;
      // console.log("价格修改成功："+this.weaponPackage[index].wpPrice);      
    },

    // 比例修改
    updateRate(index,num) {
      console.log("123");      
      this.rateObj[index].Rate = num;
      console.log("比例修改成功："+this.rateObj[index].Rate);      
    },
  },
    persist: true
})