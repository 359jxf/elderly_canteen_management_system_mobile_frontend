<template>
  <div class="item">
    <div class="pic"><img :src="`/src/assets/${img}`" height="100px" width="130px" /></div>
    <div class="bottom">
      <div class="text">
        <div class="name">
          <span>{{ name }}</span>
        </div>
        <div class="price">
          <span>{{ price }}</span>
        </div>
      </div>
      <div class="button">
        <button class="plus-button" @click="addItem">+</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMenuStore } from '@/store/modules/menu'
const menu = useMenuStore()
const props = defineProps({
  img: String,
  name: String,
  price: String,
  category: String
})
const addItem = () => {
  const item = {
    name: props.name,
    price: props.price,
    category: props.category,
    img: props.img,
    quantity: 1
  }
  // 将菜品添加到菜单中
  menu.addItem(item)
  console.log(menu.items)
}
</script>
<style scoped>
.item {
  border-radius: 10px;
  width: 44%;
  margin: 3%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.pic {
  margin-top: 5%;
  margin-left: 12%;
}
.pic img {
  border-radius: 10px;
}
.bottom {
  display: flex;
}
.text {
  width: 46%;
  margin-left: 4%;
}
.name {
  margin-left: 7%;
}
.name span {
  font-size: medium;
  font-weight: bold;
}
.price {
  margin-left: 7%;
}
.price span {
  font-size: medium;
  font-weight: bold;
}
.button {
  margin-left: 15%;
  width: 35%;
}
.plus-button {
  background-color: orange;
  border: none;
  color: black;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 24px;
  display: flex;
  margin-top: 30%;
  margin-left: 40%;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}
</style>
