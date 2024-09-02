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
  <div>
    <van-popup v-model:show="showBottom" position="bottom" class="popup-container">
      <div class="popup-header">
        <span class="header-title">购物车</span>
        <van-icon name="cross" class="close-icon" @click="showBottom = false" />
      </div>
      <div class="popup-content">
        <div v-if="cartItems.length === 0" class="empty-cart">购物车为空</div>
        <div v-else>
          <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <img :src="item.img" alt="" class="cart-item-img" />
            <div class="cart-item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">{{
                (parseFloat(item.price.replace('￥', '')) * item.discount).toFixed(2)
              }}</span>
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
        <span class="total-price">总价：{{ menu.totalPrice }}</span>
        <van-button class="checkout-button" type="primary" @click="handleCheckout"
          >去结算</van-button
        >
      </div>
    </van-popup>

    <van-action-bar>
      <div class="cart">
        <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon"></van-action-bar-icon>
      </div>
      <div class="text" @click="onClickIcon">
        <span>查看购物车</span>
      </div>
    </van-action-bar>
  </div>
</template>

<script setup>
import 'vant/es/toast/style'
import { useMenuStore } from '@/store/modules/menu'
//import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { computed } from 'vue'
import { showToast } from 'vant'
import router from '@/router'
const menu = useMenuStore()
//const router = useRouter()
const cartItems = computed(() => {
  return menu.items.filter((item) => item.quantity >= 1)
})
const showBottom = ref(false)
const buttons = ref([
  { id: '1', name: '主食', focus: false },
  { id: '2', name: '炒菜', focus: false },
  { id: '3', name: '凉菜', focus: false },
  { id: '4', name: '粥品', focus: false }
])
const items = ref([
  {
    img: 'beef.png',
    name: '红烧肉',
    price: '￥2.00',
    category: '主食',
    discount: 1
  },
  {
    img: 'beef.png',
    name: '黑烧肉',
    price: '￥2.00',
    category: '炒菜',
    discount: 0.5
  },
  {
    img: 'beef.png',
    name: '蓝烧肉',
    price: '￥2.00',
    category: '凉菜',
    discount: 0.8
  },
  {
    img: 'beef.png',
    name: '绿烧肉',
    price: '￥2.00',
    category: '粥品',
    discount: 0.7
  },
  {
    img: 'beef.png',
    name: '紫烧肉',
    price: '￥2.00',
    category: '主食',
    discount: 0.8
  },
  {
    img: 'beef.png',
    name: '白烧肉',
    price: '￥2.00',
    category: '炒菜',
    discount: 0.9
  },
  {
    img: 'beef.png',
    name: '绿烧肉',
    price: '￥2.00',
    category: '凉菜',
    discount: 0.8
  },
  {
    img: 'beef.png',
    name: '粉烧肉',
    price: '￥2.00',
    category: '粥品',
    discount: 0.6
  }
])

const onClickIcon = () => {
  if (menu.totalPrice == 0) showToast('购物车为空,请先选购！')
  //showDialog({ message: '购物车为空' })
  else showBottom.value = true
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
  return filteredByCategory.filter((item) => item.name.toLowerCase().includes(searchLower))
})

const increaseQuantity = (index) => {
  const item = cartItems.value[index]
  if (item) {
    menu.addcount(item.name) // 调用 store 中的 addcount 方法
  }
}

const decreaseQuantity = (index) => {
  const item = cartItems.value[index]
  if (item) {
    menu.minuscount(item.name) // 调用 store 中的 minuscount 方法
  }
}

const handleCheckout = () => {
  router.push('/ShoppingCart')
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

.item-price {
  font-size: 16px;
  color: #ff5722;
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
</style>
