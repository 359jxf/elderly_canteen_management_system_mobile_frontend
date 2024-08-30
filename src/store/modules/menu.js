// stores/menu.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  // State: 记录已点的菜品
  const items = ref([])

  // Getter: 计算总价格
  const totalPrice = computed(() => {
    return items.value
      .reduce(
        (total, item) =>
          total + parseFloat(item.price.replace('￥', '')) * item.quantity * item.discount,
        0
      )
      .toFixed(2)
  })

  // Action: 添加菜品到菜单
  const addItem = (item) => {
    const existingItem = items.value.find(
      (i) => i.name === item.name && i.category === item.category // 暂时
    )
    if (existingItem) {
      // 如果菜品已存在，增加数量
      existingItem.quantity += item.quantity
    } else {
      // 如果菜品不存在，添加新菜品，并初始化数量
      items.value.push({ ...item, quantity: item.quantity || 1 })
    }
  }

  // Action: 移除菜品
  const removeItem = (index) => {
    items.value.splice(index, 1)
  }

  const addcount = (name) => {
    const item = items.value.find((item) => item.name === name) // 找到名称匹配的菜品
    if (item) {
      item.quantity = (item.quantity || 0) + 1 // 如果数量未定义，初始化为0
    }
  }

  const minuscount = (name) => {
    const itemIndex = items.value.findIndex((item) => item.name === name) // 找到名称匹配的菜品的索引
    if (itemIndex !== -1) {
      const item = items.value[itemIndex]
      if (item.quantity > 1) {
        item.quantity -= 1 // 只有在数量大于1时才减少
      } else {
        items.value.splice(itemIndex, 1) // 数量为0时删除菜品
      }
    } else {
      console.log(`Item with name "${name}" not found.`)
    }
  }

  const clearItems = () => {
    items.value = [] // 清空所有菜品
  }

  const getItemCount = (name) => {
    const itemIndex = items.value.findIndex((item) => item.name === name)
    if (itemIndex !== -1) {
      const item = items.value[itemIndex]
      return item.quantity
    }
  }
  return {
    items,
    totalPrice,
    addItem,
    removeItem,
    addcount,
    minuscount,
    clearItems,
    getItemCount
  }
})
