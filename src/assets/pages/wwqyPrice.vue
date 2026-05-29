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
                        <input v-model="inputValue" :min="0" @change="handleChange" class="dark-input"  controls-position="right"/>
                    </div>

                    <!-- 二次实名选项 -->
                    <div class="form-item">
                        <label class="form-label">是否可二次：</label>
                        <el-radio-group v-model="iftowChange" @change="handleRadioChange">
                            <el-radio value="可二次实名">可二次实名</el-radio>
                            <el-radio value="不可二次实名">不可二次实名</el-radio>
                        </el-radio-group>
                    </div>

                    <!-- 额外资产 -->
                    <div class="full-width category-box">
                        <h3>额外资产 (勾选拥有的)</h3>
                        <div class="checkbox-group" id="knifeCheckboxGroup">
                            <el-checkbox-group v-model="checkedList" class="checkbox-group">
                                <div v-for="(p, index) in wpObject" :key="p.wpName" class="checkbox-item">
                                    <el-image style="width: 160px; height: 160px" :src="p.url" fit="contain"
                                        @click.native="checkedList = toggleItem(checkedList, p)" />
                                    <el-checkbox :label="p" size="large">{{ p.wpName }}</el-checkbox>
                                </div>
                            </el-checkbox-group>
                        </div>
                    </div>
                   
                </div>
                <div class="countPrice">

                    <div class="rePrice">
                        回收建议价：
                        <text style="color: greenyellow;">
                        {{ finalAllPrice }}</text>
                    </div>
                    <div class="price_btn">
                        <el-button type="warning" class="btn" @click="resetAll">重置</el-button>
                        <!-- <el-button type="primary" class="btn" @click="copyText">复制文本</el-button> -->
                    </div>
                    <!-- <div class="price_text">
                        <el-text style="color: #fff;">145级，铂金1；{{inputValue }}皮肤总价值；【枪皮】：；【QQ】；{{iftowChange}}</el-text>
                    </div> -->

                </div>
            </form>
        </div>

    </div>
</template>

<script setup>
document.title = "无畏契约估价"
import { ref, computed } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { ElText } from 'element-plus'

// 拿到仓库实例
const counterStore = useCounterStore()
const wpObject = counterStore.weaponPackage
const rateStore = counterStore.rateObj

// 响应式数据
const checkedList = ref([])
const inputValue = ref(0) // 输入框值
const iftowChange = ref('可二次实名') // 单选框值
const baseRate = rateStore[0].Rate
const towRate = rateStore[1].Rate

console.log(baseRate,towRate);


// 点击图片切换选中状态（核心方法）
const toggleItem = (list, item) => {
    const found = list.find(i => i.wpName === item.wpName)
    if (found) {
        return list.filter(i => i.wpName !== item.wpName)
    } else {
        return [...list, item]
    }
}
// 复选框价格合计
const checkTotal = computed(() => {
    return checkedList.value.reduce((sum, item) => sum + item.wpPrice, 0)
})

// 最终总价（实名打折，区域打折）
const finalAllPrice = computed(() => {
    var countPrice = inputValue.value 

    // 价格区域打折
    if (countPrice <= 10000) {
        countPrice =countPrice*baseRate*0.5
    }else if(countPrice>10000 && countPrice<=30000){
        countPrice =countPrice*baseRate*0.35
    }else if(countPrice>30000 && countPrice<=40000){
        countPrice =countPrice*baseRate*0.3
    }else if(countPrice>40000){
        countPrice =countPrice*baseRate*0.25
    }

    if(iftowChange.value === '可二次实名'){
        countPrice = countPrice+ checkTotal.value
    }else{
        countPrice = countPrice * towRate + checkTotal.value
    }

    return countPrice.toFixed(2)
})

// 重置
const resetAll = () => {
    checkedList.value = []
    inputValue.value = 0
    iftowChange.value = '可二次实名'
}
// 文本复制
const copyText = ()=>{

}
</script>

<style lang="css" scoped>
/* 基础布局 */
.container {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 24px;
    padding: 2rem;
    width: 100%;
    max-width: 1200px;
    margin: 70px auto 0;
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
    border-bottom: 1px solid #ffffff;
    padding-bottom: 12px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(241, 241, 241, 0.8);
}

.asset-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
/* 输入框整体背景 */
:deep(.el-input-number__wrapper) {
  background-color: #621212; /* 你想要的背景色 */
  border-color: #ddd;
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
    color: #fff;
    font-weight: 500;
}

.form-Elradio {
    margin: auto 20px;

}

:deep(.el-radio__label) {
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
}


/* 🔥 深色背景专用输入框 */
.dark-input {
  width: 200px;
  padding: 10px 15px;
  font-size: 14px;

  /* 半透明玻璃质感 */
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;

  /* 文字白色 */
  color: #fff !important;
  outline: none;

  /* 动画效果 */
  transition: all 0.3s ease;
}

/* 聚焦效果 */
.dark-input:focus {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

/* 提示文字灰色 */
.dark-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* 鼠标悬浮 */
.dark-input:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

/* 去掉输入框默认箭头（可选） */
.dark-input::-webkit-outer-spin-button,
.dark-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.dark-input {
  -moz-appearance: textfield;
}


/* 分类盒子 */
.full-width {
    grid-column: span 2;
}

.category-box {
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 16px;
    padding: 1.2rem;
    border: 1px solid #ffffff;
}

.category-box h3 {
    margin: 0 0 1rem;
    color: #fff;
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

:deep(.el-checkbox__label) {
    color: #ccc;
    font-size: 14px;
}

.checkbox-item {
    min-width: 120px;
    display: flex;
    flex-direction: column;
}
.btn{
    margin-top: 10px;
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
    color: #fff;
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
    color: #fff;
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
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.rePrice {
    font-size: 20px;
    /* width: 350px; */
    flex: 1;
    color: #fff;
}
.price_btn{
    width: 100px;
    text-align: center;
    margin: 0 20px;
}
.price_text{
    border: #fff 1px solid;
    flex: 1;
    border-radius: 5px;
    padding: 5px;
    width: 200px;
    height: 150px;
}
</style>