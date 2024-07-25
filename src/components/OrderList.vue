<template>
  <div class="orderlist">
    <span class="title"> 我的点餐列表 </span>
    <DishCard />
    <DishCard />
    <hr class="hr-solid" />
    <span class="text">合计￥35.5</span>
  </div>
</template>

<script setup></script>

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
}
.text {
  font-size: 20px;
  font-weight: bold;
}
</style>
