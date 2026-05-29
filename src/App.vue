<template>
  <Menu_topBar />
  <!-- <WwqyPrice /> -->
  <div class="page-container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import WwqyPrice from './assets/pages/wwqyPrice.vue';
import Menu_topBar from './components/Menu_topBar.vue';

</script>

<style lang="css" scoped>
.page-container{
  margin-top: 70px;
}


</style>
