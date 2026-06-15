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

  // 道具信息修改
  const updateWp = async (index) => {
    const { id, wpName, wpPrice, weapon_img } = weaponPackage.value[index]
    // console.log( { id, wpName, wpPrice, weapon_img } );
    try {
      // 更新 wwqy_weapon 表中 id 为指定值的数据
      await cloudbase.rdb()
        .from("wwqy_weapon")
        .upsert({ id, wpName, wpPrice, weapon_img });
    } catch (error) {
      console.log(error);
    }

  }

  // 道具数据删除
  const deleteItem = async (index) => {
    const { id } = weaponPackage.value[index]
    weaponPackage.value.splice(index, 1)
    try {
      // 删除 wwqy_weapon 表中 id 为指定值的数据
      await cloudbase.rdb()
        .from("wwqy_weapon")
        .delete()
        .eq("id", id);
    } catch (error) {
      console.log(error);
    }
  }


  // 基础比例修改
  const updateRate = async(index) => {
    const { id, RateName, Rate } = rateObj.value[index]
    try {
      // 更新 wwqy_weapon 表中 id 为指定值的数据
      await cloudbase.rdb()
        .from("wwqy_rate")
        .upsert({ id, RateName, Rate });
    } catch (error) {
      console.log(error);
    }

  }

  // 区间比例新增
  const addRangeRate = async() => {
    const obj = { min: 900719925474099, max: 900719925474099, value: 1 }

    try {
      await cloudbase.rdb().from("wwqy_rangerate").insert(obj)
      rangeRate.value.push(obj)
    } catch (error) {
      console.log(error);
    }


  }
  // 区间比例删除
  const delRangeRate = async(index) => {
   const { id } = rangeRate.value[index]
    rangeRate.value.splice(index, 1)
    try {
      // 删除 wwqy_weapon 表中 id 为指定值的数据
      await cloudbase.rdb()
        .from("wwqy_rangerate")
        .delete()
        .match({id:index});
    } catch (error) {
      console.log(error);
    }
  }
  // 区间比例修改
  const updateRangeRate = async(index, obj) => {
     const { id, min,max,value } = rangeRate.value[index]
    try {
      // 更新 wwqy_weapon 表中 id 为指定值的数据
      await cloudbase.rdb()
        .from("wwqy_rangerate")
        .upsert({ id, min,max,value } );
    } catch (error) {
      console.log(error);
    }
  }

  return {
    rangeData,
    weaponPackage,
    rateObj,
    rangeRate,
    updateWp,
    addItem,
    deleteItem,
    updateRate,
    updateRangeRate,
    addRangeRate,
    delRangeRate
  }
},
  {
    persist: true
  }
)
