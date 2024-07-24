<template>
  <div class="navbar">
    <div class="arrow-left">
      <van-icon name="arrow-left" />
    </div>
    <div class="title">
      <p class="title-text">我的购物车</p>
    </div>
    <div class="oldman-icon">
      <img src="../assets/oldman.jpg" height="40px" width="40px" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.navbar {
  width: 100%;
  display: flex;
  height: 50px;
}
.arrow-left {
  width: 10%;
  display: flex;
  align-items: center;
}
.title {
  width: 80%;
}
.title-text {
  text-align: center;
  font-size: medium;
  font-weight: bold;
}
.oldman-icon {
  width: 10%;
  display: flex;
  align-items: center;
}
</style>
