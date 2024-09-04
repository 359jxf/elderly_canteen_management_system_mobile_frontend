import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
  const addr = ref('')
  const setDefault = ref(false)
  const note = ref('')
  return {
    addr,
    setDefault,
    note
  }
})
