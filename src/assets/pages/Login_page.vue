<template>
  <div class="login-wrap">
    <!-- 渐变背景装饰 -->
    <div class="bg-decorate"></div>
    <!-- 磨砂玻璃登录卡片 -->
    <div class="login-card">
      <h2 class="login-title">后台管理登录</h2>
      <el-form ref="loginFormRef" :model="loginForm" label-width="80px" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { cloudbase } from '@/utils/cloudbase'

const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref(null)
const loginForm = ref({
  username: '',
  password: ''
})

// 登录接口对接CloudBase
const handleLogin = async () => {
  try {
    const res = await cloudbase.auth().signInWithUsernameAndPassword(
      loginForm.value.username,
      loginForm.value.password
    )
    // 存储用户信息到pinia
    userStore.setUser(res.user)
    // 登录成功跳转到后台首页
    router.push('/home')
  } catch (err) {
    alert('账号或密码错误：' + err.message)
    console.error('登录失败', err)
  }
}
</script>
<style scoped>
/* 页面全屏容器 */
.login-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  /* background: #05000f; */
}

/* 流动紫黑渐变背景 */
.bg-decorate {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 30%, #5900b340, transparent 40%),
              radial-gradient(circle at 80% 70%, #7a00ff30, transparent 45%);
  animation: bg-flow 12s ease infinite alternate;
}

@keyframes bg-flow {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.2) translate(30px, -20px); }
}

/* 透明磨砂登录卡片 核心玻璃效果 */
.login-card {
  width: 420px;
  padding: 45px 35px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(11, 6, 17, 0.22);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(106, 0, 224, 0.18);
  z-index: 2;
}

.login-title {
  text-align: center;
  color: #e9dfff;
  margin: 0 0 35px;
  font-weight: 500;
  letter-spacing: 2px;
}

.login-form {
  --el-input-bg-color: rgba(40, 12, 68, 0.3);
  --el-input-text-color: #f0e6ff;
  --el-input-border-color: rgba(140, 70, 240, 0.3);
  --el-label-color: #cbbcf0;
}

/* 登录按钮 紫黑渐变 */
.login-btn {
  width: 100%;
  height: 44px;
  background: linear-gradient(90deg, #5800b1, #8622ff);
  border: none;
  font-size: 16px;
}
.login-btn:hover {
  background: linear-gradient(90deg, #6b00d1, #9c40ff);
}
</style>