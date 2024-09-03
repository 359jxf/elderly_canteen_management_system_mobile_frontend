<template>
  <div class="floating-cart-bar">
    <div class="cart-icon">
      <van-badge :content="menu.totalNum" v-if="menu.totalNum !== 0">
        <van-icon name="cart-o" color="#ffb94a" size="38px" @click="onClickIcon" />
      </van-badge>
      <template v-else>
        <van-icon name="cart-o" color="#ffb94a" size="38px" @click="onClickIcon" />
      </template>
    </div>
    <div class="text" @click="onClickIcon">
      <span>查看购物车</span>
    </div>
  </div>

  <div class="header">
    <SearchLine v-model="searchTerm" class="nav" />
    <img src="../assets/slogan.jpg" class="slogan" />
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
        <img :src="`/src/assets/image/${button.imageUrl}`" height="25px" width="25px" />
        <br />
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
  // try {
  //   const response = await axios.get('http://8.136.125.61/api/order/getMenuToday')
  //   items.value = response.data.menu
  //   console.log(response.data.menu)
  // } catch (error) {
  //   console.error('Error logging in with password:', error)
  // }
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
  { name: '促销', focus: false, imageUrl: 'tag.png' },
  { name: '素类', focus: false, imageUrl: 'vegetable.png' },
  { name: '荤类', focus: false, imageUrl: 'meat.png' },
  { name: '主食', focus: false, imageUrl: 'meat.png' },
  { name: '汤类', focus: false, imageUrl: 'hot-soup.png' },
  { name: '饮料', focus: false, imageUrl: 'drink.png' }
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

  // 筛选按类别
  let filteredByCategory = activeButton
    ? items.value.filter(
        (item) => item.category === activeButton.name || activeButton.name === '促销'
      )
    : items.value

  // 筛选按搜索词
  const searchLower = searchTerm.value.trim().toLowerCase()
  filteredByCategory = filteredByCategory.filter((item) =>
    item.dishName.toLowerCase().includes(searchLower)
  )

  // 如果按钮是促销按钮，筛选出促销菜品
  if (activeButton && activeButton.name === '促销') {
    filteredByCategory = filteredByCategory.filter(
      (item) => item.discountPrice && item.discountPrice !== item.dishPrice
    )
  }

  return filteredByCategory
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
  height: 23vh;
}
.nav {
  margin-bottom: 1vh;
}
.search-line-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.slogan {
  width: 100%;
}

.container {
  margin-top: 5px;
  display: flex;
  height: 77vh;
}
.button-list {
  width: 20%; /* 根据需要调整宽度 */
  background-color: #f0f0f0; /* 更柔和的背景色 */
  z-index: 1;
}

.menu {
  font-size: 20px;
  font-weight: bold; /* 加粗字体 */
  color: #333; /* 深色字体以提高对比度 */
  margin: 10px 10px; /* 上下间距 */
  text-align: center;
}

.menu-button {
  width: 100%;
  border: none;
  background-color: #f0f0f0; /* 白色背景 */
  color: black; /* 更深的橙色 */
  padding: 2px; /* 更大的内边距 */
  font-size: large; /* 更合适的字体大小 */
  text-align: center;
  border-radius: 7px;
  transition:
    background-color 0.3s,
    color 0.3s; /* 添加平滑的过渡效果 */
}
.menu-button.focus {
  background-color: white;
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
  background-color: #ffb94a;
  text-align: center;
  padding: 2vh;
  width: 100%;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  display: flex;
}
.text span {
  margin-left: 15vw;
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
.floating-cart-bar {
  position: fixed;
  top: 90vh; /* 距离顶部的距离，可以根据需要调整 */
  width: 90vw;
  margin-left: 5vw;
  margin-right: 5vw;
  border-radius: 50px; /* 椭圆形状 */
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  z-index: 1000; /* 确保悬浮栏在最上层 */
}
.cart-icon {
  padding: 10px 20px;
  background-color: white;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
.floating-cart-text {
  color: white;
  font-size: 16px;
  margin-right: 10px;
}

.floating-cart-button {
  background-color: white;
  color: #ffb94a;
}
</style>
