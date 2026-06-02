// 1. 引入定义仓库的方法
import { defineStore } from 'pinia'
// 2. 定义仓库（第一个参数是唯一 ID）
export const useCounterStore = defineStore('counter', {
  state: () => ({
    rateObj: [
      { RateName: "元/源晶", Rate: 0.077},
      { RateName: "不可实名倍率", Rate: 0.85 },
    ],
    rangeRate: [
      { min: 0, max: 40000, value: 0.35 },
      { min: 40000, max: 1000000, value: 0.22 },

    ],
    weaponPackage: [

      { wpName: "2021全球冠军赛", wpPrice: 500, url: new URL('@/assets/images/weapon/21.png', import.meta.url).href },
      { wpName: "2022全球冠军赛", wpPrice: 150, url: new URL('@/assets/images/weapon/22.png', import.meta.url).href },
      { wpName: "2023全球冠军赛", wpPrice: 350, url: new URL('@/assets/images/weapon/23.png', import.meta.url).href },
      { wpName: "2024全球冠军赛", wpPrice: 350, url: new URL('@/assets/images/weapon/24.png', import.meta.url).href },
      { wpName: "2025全球冠军赛", wpPrice: 100, url: new URL('@/assets/images/weapon/25.jpg', import.meta.url).href },
      { wpName: "离火扇", wpPrice: 300, url: new URL('@/assets/images/weapon/lihuo.png', import.meta.url).href },
      { wpName: "VTC 2025爪刀", wpPrice: 250, url: new URL('@/assets/images/weapon/VTC25zhuadao.png', import.meta.url).href },
      { wpName: "VTC 2026篆刀", wpPrice: 250, url: new URL('@/assets/images/weapon/VTC26zhuandao.png', import.meta.url).href },
      { wpName: "怜悯之刃", wpPrice: 150, url: new URL('@/assets/images/weapon/lianmin.png', import.meta.url).href },

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
    // 新增数据
    addItem(addName, addPrice, addImage) {
      const addObj = { wpName: addName, wpPrice: Number(addPrice), url: addImage }
      this.weaponPackage.unshift(addObj)
      console.log('新增成功：' + this.weaponPackage);
    },
    // 价格修改
    updatewPrice(index, num) {
      // console.log("123");      
      this.weaponPackage[index].wpPrice = num;
      // console.log("价格修改成功："+this.weaponPackage[index].wpPrice);      
    },
    updatewName(index, str) {
      // console.log("123");      
      this.weaponPackage[index].wpName = str;
      // console.log("价格修改成功："+this.weaponPackage[index].wpPrice);      
    },
    // 数据删除
    deleteItem(index) {
      const a = this.weaponPackage.splice(index, 1)
      console.log(a);

    },

    // 基础比例修改
    updateRate(index, num) {
      // console.log("123");
      this.rateObj[index].Rate = num;
      // console.log("比例修改成功：" + this.rateObj[index].Rate);
    },
    
    // 区间比例修改
    updateRangeRate(index,obj){
      // console.log("调用了区间修改");
      this.rangeRate[index] = obj
    }
  },
  persist: true
})