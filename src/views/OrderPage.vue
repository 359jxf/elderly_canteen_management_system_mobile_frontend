<template>
  <div>
    <SearchLine v-model="searchTerm" />
  </div>
  <div>
    <img src="../assets/slogan.jpg" class="slogan" />
  </div>
  <div>
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
      <DishItem v-bind="item" v-for="(item, id) in filteredItems" :key="id" />
    </div>
    <div></div>
  </div>
  <div class="blank"></div>
  <div>
    <van-action-bar>
      <div class="cart">
        <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon"></van-action-bar-icon>
      </div>
      <div class="text">
        <span>查看购物车</span>
      </div>
    </van-action-bar>
  </div>
</template>

<script setup>
import 'vant/es/toast/style'
import { useMenuStore } from '@/store/modules/menu'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { computed } from 'vue'
import { showToast } from 'vant'
const menu = useMenuStore()
const router = useRouter()
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
  else router.push({ path: '/ShoppingCart' })
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
</script>
<style scoped>
.search-line-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.slogan {
  width: 100%;
}
.container {
  display: flex;
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
  max-height: 450px;
  width: 100%; /* 菜品区域宽度，确保占据父容器的 80% */
  overflow-y: auto; /* 启用垂直滚动 */
  padding: 1%;
  display: flex;
  flex-wrap: wrap; /* 允许菜品项换行 */
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
</style>
