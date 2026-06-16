<template>
  <div v-if="identity=true" class="login">
    <Login />
  </div>

 <div v-else class="layout-wrap">
    <!-- 侧边栏 -->
    <!-- <el-aside width="200px">侧边导航</el-aside> -->
    <div class="layout-main">
      <!-- 顶部导航栏 -->
      <Menu_topBar />
      <!-- 子页面渲染位置 -->
      <router-view />
    </div>
  </div>

</template>

<script setup>
import Login from './assets/pages/Login_page.vue'
import Menu_topBar from './components/Menu_topBar.vue';

</script>

<style lang="css" scoped>
.page-container{
  margin-top: 70px;
}


</style>
