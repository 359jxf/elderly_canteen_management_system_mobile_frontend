<template>
  <div>
    <SearchLine />
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
    <DishItem v-bind="item" v-for="(item, id) in items" :key="id" />
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
        <span>￥{{ count }}</span>
      </div>
    </van-action-bar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const count = ref('25.18')
const buttons = [
  { id: '1', name: '主食', focus: 'false' },
  { id: '2', name: '炒菜', focus: 'false' },
  { id: '3', name: '凉菜', focus: 'false' },
  { id: '4', name: '粥品', focus: 'false' }
]
const items = [
  { img: 'beef.png', name: '红烧肉', price: '2.00' },
  { img: 'beef.png', name: '红烧肉', price: '2.00' },
  { img: 'beef.png', name: '红烧肉', price: '2.00' },
  { img: 'beef.png', name: '红烧肉', price: '2.00' },
  { img: 'beef.png', name: '红烧肉', price: '2.00' },
  { img: 'beef.png', name: '红烧肉', price: '2.00' }
]
const onClickIcon = () => {
  router.push({ path: '/ShoppingCart' })
}
const onClickMenuButton = (name) => {
  buttons.forEach((button) => {
    if (button.name === name) {
      button.focus = true
    } else {
      button.focus = false
    }
  })
  console.log(name)
  // 后续菜单的筛选逻辑在这里
}
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
.menu-button:focus {
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
