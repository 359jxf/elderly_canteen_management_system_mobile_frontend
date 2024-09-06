import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const addr = ref('')
  const setDefault = ref(false)
  const note = ref('')
  const clear = () => {
    addr.value = ''
  }
  return {
    addr,
    setDefault,
    note,
    clear
  }
})
