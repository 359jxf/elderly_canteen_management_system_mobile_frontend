import { defineStore } from 'pinia'
const useUserStore = defineStore('user', {
  state: () => {
    return {
      num: 10
    }
  },
  getters: {
    Num_del_8(state) {
      return state.num - 8
    }
  }
})
export default useUserStore
