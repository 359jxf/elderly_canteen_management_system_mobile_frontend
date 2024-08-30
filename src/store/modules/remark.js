// stores/remark.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRemarkstore = defineStore('remark', () => {
  const remark = ref('')
  const setMark = (newRemark) => {
    remark.value = newRemark
  }
  return {
    remark,
    setMark
  }
})
