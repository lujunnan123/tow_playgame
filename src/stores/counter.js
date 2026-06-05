// 1. 引入定义仓库的方法
import { defineStore } from 'pinia'
// 2. 定义仓库（第一个参数是唯一 ID）
export const useCounterStore = defineStore('counter', {
  state: () => ({
    rateObj: [
      { RateName: "元/源晶", Rate: 0.1},
      { RateName: "不可实名倍率", Rate: 0.85 },
    ],
    rangeRate: [
      { min: 0, max: 12000, value: 0.4 },
      { min: 12000, max: 35000, value: 0.33 },
      { min: 35000, max: 60000, value: 0.3 },
      { min: 60000, max: 90000, value: 0.25 },
      { min: 90000, max: 900719925474099, value: 0.22 }
    ],
    levelObj: [
      { levelName: "紫色", levelPrice: 30 },
      { levelName: "橙色", levelPrice: 50 },
      { levelName: "金色", levelPrice: 80 },
    ],
    weaponPackage: [

      { wpName: "2021全球冠军赛", wpPrice: 300, url: new URL('@/assets/images/weapon/21.png', import.meta.url).href },
      { wpName: "2022全球冠军赛", wpPrice: 100, url: new URL('@/assets/images/weapon/22.png', import.meta.url).href },
      { wpName: "2023全球冠军赛", wpPrice: 200, url: new URL('@/assets/images/weapon/23.png', import.meta.url).href },
      { wpName: "2024全球冠军赛", wpPrice: 200, url: new URL('@/assets/images/weapon/24.png', import.meta.url).href },
      { wpName: "2025全球冠军赛", wpPrice: 100, url: new URL('@/assets/images/weapon/25.jpg', import.meta.url).href },
      { wpName: "离火扇", wpPrice: 200, url: new URL('@/assets/images/weapon/lihuo.png', import.meta.url).href },
      { wpName: "VTC 2025爪刀", wpPrice: 50, url: new URL('@/assets/images/weapon/VTC25zhuadao.png', import.meta.url).href },
      { wpName: "VTC 2026篆刀", wpPrice: 50, url: new URL('@/assets/images/weapon/VTC26zhuandao.png', import.meta.url).href },
      { wpName: "怜悯之刃", wpPrice: 50, url: new URL('@/assets/images/weapon/lianmin.png', import.meta.url).href },

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
      // console.log(a);

    },

    // 基础比例修改
    updateRate(index, num) {
      // console.log("123");
      this.rateObj[index].Rate = num;
      // console.log("比例修改成功：" + this.rateObj[index].Rate);
    },
    
    // 区间比例修改
    updateRangeRate(index,obj){
      // console.log("调用了区间修改"+obj);
      this.rangeRate[index] = obj
      // console.log(this.rangeRate);      
    },
    // 区间比例新增
    addRangeRate(){
      const obj = { min: 0, max: 900719925474099, value: 0 }
      this.rangeRate.push(obj)
    },
    // 区间比例删除
    delRangeRate(index){
      this.rangeRate.splice(index,1)
    },

    // 品质价格修改
    updateLevelPrice(index, num) {
      // console.log("123");
      this.levelObj[index].levelPrice = num;
      console.log("价格修改成功：" + this.levelObj);
    }
  },
  persist: true
})