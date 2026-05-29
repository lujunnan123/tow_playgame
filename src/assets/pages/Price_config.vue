<template>
    <div class="container">

        <div class="title_top">
            <div class="title">估价道具配置</div>
            <div class="title_btn">
                <button class="btn">新增一级类目</button>
                <button class="btn">保存配置</button>
            </div>
        </div>
        <div>
            <!-- 基础配置区域 -->
            <div id="formContainer" class="form-container">
                <h3>基础配置</h3>
                <hr />
                <div class="itemtop">
                    <div class="itop_item" v-for="(item, index) in rateStore" :key="index">
                        {{ item.RateName }}：<input class="dark-input" style="width: 240px" :placeholder='item.Rate' v-model="item.Rate" @blur="RateChange(index,item)"/>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="title_bar">
                <div class="title_text">道具价格配置</div>
                <div class="title_option">
                    <el-button type="primary">新增</el-button>
                    <el-button type="danger">删除选中</el-button>
                </div>
            </div>
            <hr />

            <el-table 
                :data="weaponPackage" 
                :header-cell-style="{
                backgroundColor: '#1A1E20 !important',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.2)'
            }">
                <el-table-column type="selection" width="55" />
                <!-- @vue-generic {User} -->
                <el-table-column label="图片" width="150">
                    <template #default="scope">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.url" fit="contain" />
                    </template>
                </el-table-column>
                <el-table-column label="二级道具" width="450">
                    <template #default="scope">                        
                        <input class="dark-input" style="width: 300px" :placeholder='scope.row.wpName' v-model="scope.row.wpName" @blur="WpNameChange(scope)"/>
                    </template>
                </el-table-column>
                <el-table-column property="wpPrice" label="价格" width="250" >
                    <template #default="scope">
                        <input class="dark-input" style="width: 120px" :placeholder='scope.row.wpPrice' v-model="scope.row.wpPrice" @blur="PriceChange(scope)" />
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default>
                        <!-- 单行删除按钮 -->
                        <el-popconfirm width="220" :icon="InfoFilled" icon-color="#626AEF"
                            title="确定要删除?" @cancel="onCancel">
                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>
                            <template #actions="{ confirm, cancel }">
                                <el-button size="small" @click="cancel">否</el-button>
                                <el-button type="danger" size="small" @click="confirm">
                                    是
                                </el-button>
                            </template>
                        </el-popconfirm>
                       
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter.js'
import { ref } from 'vue'
const counterStore = useCounterStore()
const rateStore = counterStore.rateObj
const weaponPackage = counterStore.weaponPackage
const inputValue = ref('')
const dialogVisible = ref(false)


// 调整基础倍率
const RateChange = (indexNum,Iteminfo)=>{
    const index = indexNum
    const value =Number(Iteminfo.Rate)  
    counterStore.updateRate(index,value)    
}

// 修改名称
const WpNameChange = (Iteminfo)=>{
    const index = Iteminfo.$index
    const value =Iteminfo.row.wpName
    counterStore.updatewName(index,value)    
}

// 修改价格
const PriceChange = (Iteminfo)=>{
    const index = Iteminfo.$index
    const value =Number(Iteminfo.row.wpPrice)  
    counterStore.updatewPrice(index,value)    
}

</script>


<style lang="css" scoped>
* {
    color: #fff;
}


/* 表格主体 + 单元格 */
:deep(.el-table),
:deep(.el-table__inner-wrapper),
:deep(.el-table__body-wrapper),
:deep(.el-table th),
:deep(.el-table td),
:deep(.el-table__row),
:deep(.el-table--striped .el-table__row--striped) {
    background: transparent !important;
    /* background-color: transparent !important; */
}

/* 边框淡化 */
:deep(.el-table),
:deep(.el-table th),
:deep(.el-table td) {
    border-color: rgba(255, 255, 255, 0.2) !important;
}

.itemtop {
    margin-top: 10px;
    display: flex;

}

.itop_item {
    margin: 10px auto;

}

/* 基础布局 */
.container {
    background-color: rgba(0, 0, 0, 0.8);

    border-radius: 24px;
    padding: 2rem;
    width: 100%;
    max-width: 1200px;
    margin: 2rem auto;
    border: 1px solid #5f7a93;
    box-sizing: border-box;
}
.title_top{
    display: flex;
    justify-content: space-between;
}
.title_top .title{
    font-size: 20px;
    font-weight: bold;
}

.title_top .btn {
    margin: 0 5px;
    background-color: #5f7a93;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.25s ease;
      outline: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 100px;
    }
.title_bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title_text {
    font-size: 20px;
    font-weight: bold;
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
    background-color: #621212;
    /* 你想要的背景色 */
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
    color: rgba(255, 255, 255, 0.329);
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
</style>