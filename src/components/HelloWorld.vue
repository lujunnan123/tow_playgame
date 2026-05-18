<template>
  <div class="container" id="mainContainer">
    <!-- 表单区域 -->
    <div id="formContainer" class="form-container">
      <h2>无畏契约估价</h2>
      <form id="assetForm" class="asset-form">
        <div class="form-grid">
          <!-- 皮肤资产价值 -->
          <div class="form-item">
            <label class="form-label">皮肤资产价值：</label>
            <el-input-number v-model="num" :min="1" @change="handleChange" class="price-input" />
          </div>

          <!-- 二次实名选项 -->
          <el-radio-group v-model="selectedRadio" @change="handleRadioChange">
            <el-radio value="可二次实名">可二次实名</el-radio>
            <el-radio value="不可二次实名">不可二次实名</el-radio>
          </el-radio-group>

          <!-- 额外资产 -->
          <div class="full-width category-box">
            <h3>额外资产 (勾选拥有的)</h3>
            <div class="checkbox-group" id="knifeCheckboxGroup">
              <div v-for="(p, index) in wpObject" :key="index" class="checkbox-item">
                 <el-image style="width: 100px; height: 100px" :src="p.url" :fit="fit" />
                 <el-checkbox v-model="checkedList" :label="p.wpName" size="large" />
              </div>
            </div>
          </div>
        </div>
        <div class="countPrice">
          <el-button type="primary" class="submit-btn">计算价格</el-button>
          <div class="rePrice">
            回收建议价：
            <el-text class="mx-1" type="success">{{ endPrice }}</el-text>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'

// 拿到仓库实例
const counterStore = useCounterStore()
const testArr = counterStore.count
const wpObject = counterStore.weaponPackage

// 响应式数据
const num = ref(1)
const checkedList = ref([])
const endPrice = ref(0)
const selectedRadio = ref('0')

// 方法
const handleChange = (value) => {
  endPrice.value = value
  console.log('资产价值变更为：', value)
}
// 单选框回调
const handleRadioChange = (value)=>{
  if(value == "不可二次实名"){
    endPrice.value = endPrice.value*0.85
  }
}
</script>

<style lang="css" scoped>
/* 基础布局 */
.container {
  background: #ECF5FF;
  border-radius: 24px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  margin: 2rem auto;
  border: 1px solid #5f7a93;
  box-sizing: border-box;
}

/* 表单区域 */
.form-container {
  margin-bottom: 2rem;
}

.form-container h2 {
  margin: 0 0 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;
  border-bottom: 1px solid #051dfc;
  padding-bottom: 12px;
  color: #1400c5;
  text-shadow: 0 1px 2px rgba(241, 241, 241, 0.8);
}

.asset-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  color: #333;
}

.price-input {
  width: 100%;
}

/* 分类盒子 */
.full-width {
  grid-column: span 2;
}

.category-box {
  background: #a9eff1;
  border-radius: 16px;
  padding: 1.2rem;
  border: 1px solid #8bb1bb;
}

.category-box h3 {
  margin: 0 0 1rem;
  color: #000;
  font-size: 1.1rem;
  border-left: 4px solid #055af8;
  padding-left: 10px;
  font-weight: 500;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.checkbox-item {
  min-width: 120px;
  display: flex;
  flex-direction: column;
}

/* 按钮样式 */
.submit-btn {
  align-self: flex-start;
  padding: 0.6rem 2rem;
  font-size: 1rem;
  border-radius: 8px;
}

.btn-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

/* 结果区域 */
.result-container {
  text-align: center;
  padding: 1.5rem;
  background: #f0f8ff;
  border-radius: 16px;
  border: 1px solid #5f7a93;
}

.result-container h2 {
  margin: 0 0 1.5rem;
  color: #1400c5;
  font-weight: 500;
}

.result-text,
.result-price {
  display: block;
  background: #f8fcff;
  border: 1px solid #3d738c;
  border-radius: 12px;
  padding: 1.5rem;
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
  word-break: break-word;
  text-align: left;
  margin-bottom: 1rem;
  box-shadow: inset 0 0 8px rgba(0, 30, 40, 0.1);
}

.result-price {
  color: #e63946;
  font-weight: 600;
}

/* 辅助类 */
.hidden {
  display: none;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: span 1;
  }

  .container {
    padding: 1.5rem;
    width: 95%;
    margin: 1rem auto;
  }

  .radio-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-group {
    flex-direction: column;
    width: 100%;
  }
}

.countPrice {
  display: flex;
  justify-content: space-between;

}

.rePrice {
  margin-right: 100px;
  width: 150px;
}
</style>