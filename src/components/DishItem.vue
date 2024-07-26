<template>
  <div class="item">
    <van-card :price="price" :title="name" :thumb="img">
      <template #footer>
        <van-button size="small" color="#FFA500" style="border-radius: 50%"
          ><span color="black">+</span></van-button
        >
      </template>
    </van-card>
  </div>
</template>
<script setup>
defineProps({
  img: String,
  name: String,
  price: String
})
</script>
<style scoped>
.item {
  width: 46%;
  margin: 2%;
}
</style>
