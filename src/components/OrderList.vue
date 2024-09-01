<template>
  <div class="orderlist">
    <span class="title"> 我的点餐列表 </span>
    <!-- 显示“购物车为空”消息 -->
    <div v-if="menu.items.length === 0" class="empty-cart-message">购物车为空</div>
    <!-- 否则，显示点餐列表 -->
    <div v-else>
      <!-- 仅显示一盘菜 -->
      <DishCard v-bind="menu.items[0]" v-if="menu.items.length > 0" />
      <!-- 如果菜品超过一盘，显示更多按钮 -->
      <div v-if="menu.items.length > 1">
        <!-- 显示剩余菜品 -->
        <div v-show="showMore" class="more-items">
          <DishCard v-bind="item" v-for="(item, id) in menu.items.slice(1)" :key="id" />
        </div>
        <!-- 下拉箭头 -->
        <div class="show-more" @click="toggleShowMore">
          <span v-if="!showMore">显示更多</span>
          <span v-if="showMore">收起</span>
          <van-icon name="arrow-down" v-if="!showMore" />
          <van-icon name="arrow-up" v-if="showMore" />
        </div>
      </div>
      <hr class="hr-solid" />
      <span class="text"> 合计￥{{ menu.totalPrice }} </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from '@/store/modules/menu'
import DishCard from './DishCard.vue'

const menu = useMenuStore()
const showMore = ref(false)

const toggleShowMore = () => {
  showMore.value = !showMore.value
}
</script>
<style scoped>
.orderlist {
  border-radius: 15px;
  margin: 4%;
  padding: 4%;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.hr-solid {
  margin-top: 10%;
  border: 0;
  border-top: 1px solid #d0d0d5;
  margin-bottom: 5%;
}
.text {
  font-size: 20px;
  font-weight: bold;
}
.empty-cart-message {
  text-align: center;
  font-size: 18px;
  color: #999;
}
.show-more {
  cursor: pointer;
  text-align: center;
  color: #ffa500;
  font-weight: bold;
  margin-top: 10px;
}
.more-items {
  margin-top: 10px;
}
</style>
