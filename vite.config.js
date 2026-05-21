import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
 
// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 相对路径，本地打开必备
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})