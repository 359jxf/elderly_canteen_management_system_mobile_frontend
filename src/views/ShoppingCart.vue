<template>
  <div class="container">
    <div class="content">
      <NavBar title="我的购物车" />
      <AddressCard address="上海市 嘉定区 曹安公路 4800号" />
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
}

.content {
  flex: 1;
}
</style>
