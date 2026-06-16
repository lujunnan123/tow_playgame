import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    uid: '',
    userInfo: null
  }),
  actions: {
    setUser(user) {
      this.uid = user.uid
      this.userInfo = user
    },
    logout() {
      this.uid = ''
      this.userInfo = null
    }
  },
  persist: true // pinia持久化插件，刷新页面不丢失登录态
})