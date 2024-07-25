<template>
  <div class="item">
    <van-card
      price="2.00"
      title="好吃的东西"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    >
      <template #footer>
        <van-button size="small" color="#FFA500" style="border-radius: 50%"
          ><span color="black">+</span></van-button
        >
      </template>
    </van-card>
  </div>
</template>
<script setup></script>
<style scoped>
.item {
  width: 46%;
  margin: 2%;
}
</style>
