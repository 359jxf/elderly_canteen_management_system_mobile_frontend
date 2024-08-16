<template>
  <div>
    <SearchLine v-model="searchTerm" />
  </div>
  <div>
    <img src="../assets/slogan.jpg" class="slogan" />
  </div>
  <div class="mid">
    <span class="menu">今日菜单</span>
    <van-row gutter="0" style="margin: 2%">
      <van-col span="6" class="menu-line" v-for="button in buttons" :key="button.id">
        <button
          class="menu-button"
          :class="{ focus: button.focus }"
          @click="onClickMenuButton(button.name)"
        >
          {{ button.name }}
        </button>
      </van-col>
    </van-row>
  </div>
  <div class="item-list">
    <DishItem v-bind="item" v-for="(item, id) in filteredItems" :key="id" />
  </div>
  <div>
    <router-link to="/login"></router-link>
    <router-link to="/OrderDetail"></router-link>
  </div>
  <div>
    <van-action-bar>
      <div class="cart">
        <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon"></van-action-bar-icon>
      </div>
      <div class="text">
        <span>查看购物车</span>
      </div>
      <div class="num">
        <span>￥{{ menu.totalPrice }}</span>
      </div>
    </van-action-bar>
  </div>
</template>

<script setup>
import { useMenuStore } from '@/store/modules/menu'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { computed } from 'vue'
const menu = useMenuStore()
const router = useRouter()
const buttons = ref([
  { id: '1', name: '主食', focus: false },
  { id: '2', name: '炒菜', focus: false },
  { id: '3', name: '凉菜', focus: false },
  { id: '4', name: '粥品', focus: false }
])
const items = ref([
  { img: 'beef.png', name: '红烧肉', price: '￥2.00', category: '主食' },
  { img: 'beef.png', name: '黑烧肉', price: '￥2.00', category: '炒菜' },
  { img: 'beef.png', name: '蓝烧肉', price: '￥2.00', category: '凉菜' },
  { img: 'beef.png', name: '绿烧肉', price: '￥2.00', category: '粥品' },
  { img: 'beef.png', name: '紫烧肉', price: '￥2.00', category: '主食' },
  { img: 'beef.png', name: '白烧肉', price: '￥2.00', category: '炒菜' }
])
const onClickIcon = () => {
  router.push({ path: '/ShoppingCart' })
}
const onClickMenuButton = (name) => {
  buttons.value.forEach((button) => {
    if (button.name === name) {
      if (button.focus === true) {
        button.focus = false
        button.active = false
      } else button.focus = true
    } else {
      button.focus = false
    }
  })
  console.log(name)
}

// const filteredItems = computed(() => {
//   const activeButton = buttons.value.find((button) => button.focus === true)
//   if (!activeButton) return items.value
//   return items.value.filter((item) => item.category === activeButton.name)
// })
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
.mid {
  margin: 3%;
}
.menu {
  font-size: 20px;
  font-weight: 1000;
  margin: 2%;
}
.menu-button {
  color: #ffa500;
  height: 35px;
  width: 70px;
  border: 1px solid #ffa500;
  background-color: white;
  border-radius: 7px;
  font-size: medium;
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
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 46%;
  margin: 2%;
}
.cart {
  margin-right: 5%;
  margin-left: 5%;
}
.text {
  font-size: medium;
  font-weight: bold;
  margin-right: 30%;
}
.num {
  font-size: large;
  font-weight: bold;
}
</style>
