<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#1B1F22"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
    :ellipsis="false"
  >
    <el-menu-item index="1">估价首页</el-menu-item>
    <el-menu-item index="2">价格配置</el-menu-item>
    <el-menu-item index="3">组合配置</el-menu-item>

    </el-menu>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<style lang="css" scoped>
.el-menu--horizontal > .el-menu-item {
  margin:0 auto;
}
</style>
