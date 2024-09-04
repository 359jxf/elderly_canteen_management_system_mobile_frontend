// stores/menu.js
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  // State: 记录已点的菜品
  const items = ref([])

  const totalNum = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  // Action: 添加菜品到菜单
  const addItem = (item) => {
    const existingItem = items.value.find((i) => i.dishName === item.dishName)
    if (existingItem) {
      // 如果菜品已存在，增加数量
      existingItem.quantity += 1
    } else {
      // 如果菜品不存在，添加新菜品，并初始化数量
      items.value.push({ ...item, quantity: item.quantity || 1 })
    }
    console.log(items.value)
  }

  const clear = () => {
    items.value = []
  }
  const minusItem = (item) => {
    const existingIndex = items.value.findIndex((i) => i.dishName === item.dishName) // 找到名称匹配的菜品的索引
    if (existingIndex !== -1) {
      // 确保找到的索引有效
      if (items.value[existingIndex].quantity > 1) {
        items.value[existingIndex].quantity -= 1 // 只有在数量大于1时才减少
      } else {
        items.value.splice(existingIndex, 1) // 数量为0时删除菜品
      }
    } else {
      console.log(`Item with name "${item.dishName}" not found.`)
    }
  }

  const getItemCount = (name) => {
    const itemIndex = items.value.findIndex((item) => item.dishName === name)
    if (itemIndex !== -1) {
      const item = items.value[itemIndex]
      return item.quantity
    }
  }
  return {
    items,
    totalNum,
    clear,
    addItem,
    minusItem,
    getItemCount
  }
})
