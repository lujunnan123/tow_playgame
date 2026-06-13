// 1. 引入定义仓库的方法
import { defineStore } from 'pinia'

import { cloudbase } from '@/utils/cloudbase'
import { ref } from 'vue'


// 2. 定义仓库（第一个参数是唯一 ID）
export const useCounterStore = defineStore('counter', () => {
  const weaponPackage = ref([])
  const rateObj = ref([])
  const rangeRate = ref([])
const message = ref("");

  // 1.加载数据
  const rangeData = async () => {
    try {
      // 并行查询 3 张表（互不影响，速度更快）
      const [result1, result2, result3] = await Promise.all([
        cloudbase.rdb().from("wwqy_rangerate").select("*"),
        cloudbase.rdb().from("wwqy_rate").select("*"),
        cloudbase.rdb().from("wwqy_weapon").select("*"),
      ])

      // 分别赋值
      if (!result1.error) rangeRate.value = result1.data
      if (!result2.error) rateObj.value = result2.data
      if (!result3.error) weaponPackage.value = result3.data

      console.log('✅ 全部加载完成', {
        rangeRate: rangeRate.value,
        rateObj: rateObj.value,
        weaponPackage: weaponPackage.value
      })

    } catch (err) {
      console.error('❌ 请求失败', err)
    }
  }

  // 道具新增数据
  const addItem = async (addName, addPrice, addImage) => {
    const addObj = { wpName: addName, wpPrice: Number(addPrice), weapon_img: addImage }
    weaponPackage.value.unshift(addObj)
    try {
      await cloudbase.rdb().from("wwqy_weapon").insert(addObj)
    } catch (error) {
      console.log(error);
    }
  }
  // 道具价格修改
  const updatawPrice = async(index, num) => {
    weaponPackage.value[index].wpPrice = Number(num);
    const cloundId = index+1
      // 更新 wwqy_weapon 表中 id 为指定值的数据
    const { error } = await cloudbase.rdb().from("wwqy_weapon").update({ wpPrice: 700 }).eq("wpName", "离火扇");
    if (!error) {
      message.value = "更新成功！";
    } else {
      message.value = "更新失败：" + error.message;
    }



  }
  // 道具名字修改 
  const updatewName = (index, str) => {
    weaponPackage.value[index].wpName = str;
  }
  // 道具数据删除
  const deleteItem = (index) => {
    weaponPackage.value.splice(index, 1)
  }

  // 基础比例修改
  const updateRate = (index, num) => {
    rateObj.value[index].Rate = num;
  }
  // 区间比例修改
  const updateRangeRate = (index, obj) => {
    rangeRate.value[index] = obj
  }
  // 区间比例新增
  const addRangeRate = () => {
    const obj = { min: 0, max: 900719925474099, value: 0 }
    rangeRate.value.push(obj)
  }
  // 区间比例删除
  const delRangeRate = (index) => {
    rangeRate.value.splice(index, 1)
  }

  const saveAll = () => {
    console.log('获取修改后数据', {
      rangeRate: rangeRate.value,
      rateObj: rateObj.value,
      weaponPackage: weaponPackage.value
    })

  }


  return {
    rangeData,
    weaponPackage,
    rateObj,
    rangeRate,
    addItem,
    updatawPrice,
    deleteItem,
    updatewName,
    updateRate,
    updateRangeRate,
    addRangeRate,
    delRangeRate,
    saveAll
  }
},
  {
    persist: true
  }
)
