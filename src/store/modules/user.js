import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const defaultAddr = ref('上海市 嘉定区 曹安公路4800号')
  return {
    defaultAddr
  }
})
