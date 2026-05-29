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
    <el-menu-item index="home">
      估价首页
    </el-menu-item>
    <el-menu-item index="Pconfig" >      
      价格配置
    </el-menu-item>
    <el-menu-item index="3">组合配置</el-menu-item>

    </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router'
const activeIndex = ref('home')

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
  if(key == "home"){
    router.push('/')
  }else if(key == "Pconfig"){
    router.push('/Pconfig')
  }
}
</script>
<style lang="css" scoped>
.el-menu--horizontal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.el-menu--horizontal > .el-menu-item {
  margin:0 auto;
}
</style>
