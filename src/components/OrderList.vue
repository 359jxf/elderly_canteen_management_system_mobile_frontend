<template>
  <div class="orderlist">
    <span class="title"> 我的点餐列表 </span>
    <DishCard />
    <DishCard />
    <DishCard />
    <span class="text">合计￥35.5</span>
  </div>
</template>

<script setup></script>

<style scoped>
.orderlist {
  border-radius: 7px;
  margin: 4%;
  padding: 4%;
  background-color: green;
}
.title {
  font-size: 25px;
  font-weight: bold;
}
.text {
  font-size: 20px;
  font-weight: bold;
}
</style>
