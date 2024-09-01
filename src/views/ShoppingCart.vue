<template>
  <div class="container">
    <Nav class="fixed-nav" nav_text="我的购物车" />
    <div class="content">
      <AddressCard />
      <OrderList />
      <RemarkItem />
    </div>
    <PayFooter />
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 60px; /* 确保内容不会被固定的 Nav 覆盖 */
}

.content {
  flex: 1;
}

/* 固定在顶部的导航 */
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px; /* 可以根据需要调整高度 */
  background-color: #fff; /* 背景颜色可以根据设计调整 */
  z-index: 1000; /* 确保 Nav 在其他内容之上 */
  border-bottom: 1px solid #ddd; /* 可选的边框 */
}

/* 页面底部的支付页脚，不固定 */
.pay-footer {
  margin-top: 20px; /* 确保底部距离内容有一定的间距 */
  padding: 10px; /* 内边距可以根据需要调整 */
  background-color: #f8f8f8; /* 背景颜色可以根据设计调整 */
}
</style>
