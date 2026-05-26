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
                        <el-input-number v-model="inputValue" :min="0" @change="handleChange" class="price-input"   controls-position="right"/>
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
                                    <el-image style="width: 100px; height: 100px" :src="p.url" fit="contain"
                                        @click.native="checkedList = toggleItem(checkedList, p)" />
                                    <el-checkbox :label="p" size="large">{{ p.wpName }}</el-checkbox>
                                </div>
                            </el-checkbox-group>
                        </div>
                    </div>
                   
                </div>
                <div class="countPrice">
                    <el-button type="warning" class="submit-btn" @click="resetAll">重置</el-button>
                  
                    <div class="rePrice">
                        回收建议价：
                        <text style="color: greenyellow;">
                        {{ finalAllPrice }}</text>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script setup>
document.title = "无畏契约估价"
import { ref, computed } from 'vue'
import { useCounterStore } from '@/stores/counter'

// 拿到仓库实例
const counterStore = useCounterStore()
const wpObject = counterStore.weaponPackage

// 响应式数据
const checkedList = ref([])
const inputValue = ref(0) // 输入框值
const iftowChange = ref('可二次实名') // 单选框值

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
        countPrice *= 0.05
    }else if(countPrice>10000 && countPrice<=30000){
        countPrice *= 0.035
    }else if(countPrice>30000 && countPrice<=40000){
        countPrice *= 0.03
    }else if(countPrice>40000){
        countPrice *= 0.025
    }

    if(iftowChange.value === '可二次实名'){
        countPrice = countPrice+ checkTotal.value
    }else{
        countPrice = countPrice * 0.85+ checkTotal.value
    }

    return countPrice.toFixed(2)
})

// 重置
const resetAll = () => {
    checkedList.value = []
    inputValue.value = 0
    iftowChange.value = '可二次实名'
}
</script>

<style lang="css" scoped>
/* 基础布局 */
.container {
    background-color: rgba(0, 0, 0, 0.8);

    border-radius: 24px;
    padding: 2rem;
    width: 100%;
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

.price-input {
    width: 80%;
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
    /* justify-content: space-between; */

}

/* :deep(el-text){
    width: 100%;
} */

.rePrice {
    margin-left: 50px;
    font-size: 20px;
    width: 100%;
    color: #fff;
}
</style>