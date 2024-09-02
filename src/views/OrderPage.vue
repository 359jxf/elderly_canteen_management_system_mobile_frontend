<template>
  <div class="header">
    <SearchLine v-model="searchTerm" />
    <img src="../assets/slogan.jpg" class="slogan" />
  </div>
  <div class="title">
    <span class="menu">今日菜单</span>
  </div>
  <div class="container">
    <div class="button-list">
      <button
        class="menu-button"
        :class="{ focus: button.focus }"
        v-for="button in buttons"
        :key="button.id"
        @click="onClickMenuButton(button.name)"
      >
        {{ button.name }}
      </button>
    </div>
    <div class="item-list">
      <DishItem v-bind="item" v-for="(item, id) in filteredItems" :key="id" class="dish-item" />
      <div class="blank"></div>
    </div>
    <div></div>
  </div>
  <van-popup v-model:show="showBottom" position="bottom" class="popup-container">
    <div class="popup-header">
      <span class="header-title">购物车</span>
      <span class="clear-cart-button" @click="clearCartItem">清空</span>
    </div>
    <div class="popup-content">
      <div v-if="cartItems.length === 0" class="empty-cart">购物车为空</div>
      <div v-else>
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <img :src="item.imageUrl" alt="" class="cart-item-img" />
          <div class="cart-item-info">
            <span class="item-name">{{ item.dishName }}</span>
            <div class="item-price-info">
              <span v-if="item.dishPrice > item.discountPrice" class="original-price">
                ￥{{ item.dishPrice }}
              </span>
              <span class="discount-price"> ￥{{ item.discountPrice }} </span>
            </div>
            <div class="item-quantity-control">
              <van-button size="small" type="default" @click="decreaseQuantity(index)"
                >-</van-button
              >
              <span class="item-quantity">x {{ item.quantity }}</span>
              <van-button
                size="small"
                type="primary"
                @click="increaseQuantity(index)"
                class="plus-button"
                >+</van-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-footer">
      <span class="total-price">总价：￥{{ totalPrice }}</span>
      <van-button class="checkout-button" type="primary" @click="handleCheckout">去结算</van-button>
    </div>
  </van-popup>

  <van-action-bar>
    <div class="cart">
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        @click="onClickIcon"
        :badge="menu.totalNum > 0 ? menu.totalNum : ''"
      ></van-action-bar-icon>
    </div>
    <div class="text" @click="onClickIcon">
      <span>查看购物车</span>
    </div>
  </van-action-bar>
</template>

<script setup>
import 'vant/es/toast/style'
import { useMenuStore } from '@/store/modules/menu'
import { ref } from 'vue'
import { computed } from 'vue'
import { showToast } from 'vant'
import router from '@/router'
import { createCart, getCartItem, getMenuToday, updateCartItem, clearCart } from '@/api/api'
import { onMounted } from 'vue'
const menu = useMenuStore()
const cartId = ref('')
const cartItems = ref([])
const items = ref([])
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.discountPrice * item.quantity, 0)
})
const getItems = async () => {
  try {
    items.value = await getMenuToday()
  } catch (error) {
    console.error('获取当日菜品失败：', error)
    showToast('获取当日菜品失败，请稍后再试')
  }
}
const getCartId = async () => {
  try {
    cartId.value = await createCart()
  } catch (error) {
    console.error('生成购物车失败：', error)
    showToast('生成购物车失败，请稍后再试')
  }
}
onMounted(async () => {
  await getItems()
  await getCartId()
})
const showBottom = ref(false)
const buttons = ref([
  { name: '主食', focus: false },
  { name: '炒菜', focus: false },
  { name: '凉菜', focus: false },
  { name: '粥品', focus: false }
])
const onClickIcon = async () => {
  if (menu.totalNum == 0) {
    showToast('购物车为空，请先选购！')
  } else {
    try {
      cartItems.value = await getCartItem()
      showBottom.value = true
    } catch (error) {
      console.error('获取购物车菜品失败:', error)
      showToast('获取购物车菜品失败，请稍后再试。')
    }
  }
}
const onClickMenuButton = (name) => {
  buttons.value.forEach((button) => {
    if (button.name === name) {
      if (button.focus === true) {
        button.focus = false
      } else button.focus = true
    } else button.focus = false
  })
}

const searchTerm = ref('')
const filteredItems = computed(() => {
  const activeButton = buttons.value.find((button) => button.focus)
  const filteredByCategory = activeButton
    ? items.value.filter((item) => item.category === activeButton.name)
    : items.value
  const searchLower = searchTerm.value.trim().toLowerCase()
  return filteredByCategory.filter((item) => item.dishName.toLowerCase().includes(searchLower))
})
const increaseQuantity = async (index) => {
  const item = cartItems.value[index]
  item.quantity++
  menu.addItem(item)
  await updateCartItem(cartId, item.dishId, 1)
}
const decreaseQuantity = async (index) => {
  const item = cartItems.value[index]
  item.quantity--
  if (item.quantity === 0) cartItems.value.splice(index, 1)
  menu.minusItem(item)
  await updateCartItem(cartId, item.dishId, -1)
}
const handleCheckout = () => {
  router.push('/ShoppingCart')
}
const clearCartItem = async () => {
  try {
    await clearCart()
    cartItems.value = [] // 清空本地购物车数据
    menu.clear()
  } catch (error) {
    console.error('清空购物车失败:', error)
    showToast('清空购物车失败，请稍后再试。')
  }
}
</script>
<style scoped>
.header {
  height: 25vh;
}
.search-line-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.slogan {
  width: 100%;
}
.title {
  height: 5vh;
}
.container {
  display: flex;
  height: 70vh;
}
.button-list {
  width: 20%; /* 根据需要调整宽度 */
  border-right: 1px;
}
.menu {
  font-size: 20px;
  font-weight: 1000;
  margin: 2%;
  text-align: center;
}
.menu-button {
  width: 100%;
  flex: 1; /* 平分按钮区域 */
  border: none; /* 取消按钮边框 */
  background-color: white; /* 背景色 */
  color: #ffa500; /* 按钮文字颜色 */
  padding: 10px; /* 内边距 */
  margin-bottom: 10px; /* 按钮之间的间距 */
  font-size: medium; /* 按钮文字大小 */
  text-align: center; /* 使按钮文字居中 */
  border-radius: 7px; /* 圆角 */
}
.menu-button.focus {
  background-color: orange;
  color: black;
}
.menu-line {
  display: flex;
  align-items: center;
}
.item-list {
  max-height: 70vh;
  width: 80%;
  overflow-y: auto;
  flex-wrap: wrap;
}
.dish-item {
  width: 90%;
  box-sizing: border-box;
}
.cart {
  margin-right: 5%;
  margin-left: 5%;
}
.text {
  font-size: medium;
  font-weight: bold;
  margin-left: 15%;
}
.num {
  font-size: large;
  font-weight: bold;
}
.blank {
  height: 50px; /* 设置行的高度 */
  width: 100%; /* 宽度占满父容器 */
  background-color: transparent; /* 背景色透明 */
}
.popup-container {
  border-radius: 10px 10px 0 0;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
}

.close-icon {
  font-size: 24px;
  color: #333;
}

.popup-content {
  padding: 10px;
}

.empty-cart {
  text-align: center;
  color: #999;
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.cart-item-img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 8px;
}

.cart-item-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-name {
  font-size: 16px;
  font-weight: 500;
}

.item-price-info {
  display: flex;
  flex-direction: column;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
}

.discount-price {
  color: #ff5722;
  font-size: 16px;
  font-weight: bold;
}

.item-quantity {
  font-size: 14px;
  color: #666;
}

.item-quantity-control {
  display: flex;
  align-items: center;
}

.item-quantity-control .van-button {
  margin: 0 5px;
}

.popup-footer {
  padding: 10px;
  background-color: #f8f8f8;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
}

.checkout-button {
  width: 120px;
  background-color: #ffa500;
  border-color: #ffa500;
}
.plus-button {
  background-color: #ffa500;
  border-color: #ffa500;
}
.footer {
  border-radius: 15px;
  border-color: #ffa500;
}
.clear-cart-button {
  font-size: medium;
  color: red;
  font-weight: bold;
}
</style>
