<template>
  <div class="dishcard">
    <div class="card-left">
      <img src="../assets/beef.png" height="75px" />
    </div>
    <div class="card-right">
      <div class="card-right-top">
        <span class="text">{{ props.name }}</span>
      </div>
      <div class="card-right-bottom">
        <div class="card-right-bottom-left">
          <span class="text">{{ props.price }}</span>
        </div>
        <div class="card-right-bottom-right">
          <button class="icon-button" @click="decreaseQuantity">
            <img src="../assets/minus.png" />
          </button>
          <span class="num">&nbsp;{{ props.quantity }}&nbsp;</span>
          <button class="icon-button" @click="increaseQuantity">
            <img src="../assets/plus.png" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useMenuStore } from '@/store/modules/menu'
const menu = useMenuStore()
const props = defineProps({
  img: String,
  name: String,
  price: String,
  category: String,
  quantity: String
})
const increaseQuantity = () => {
  menu.addcount(props.name)
}
const decreaseQuantity = () => {
  menu.minuscount(props.name)
}
</script>

<style scoped>
.dishcard {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  margin-top: 4%;
  border-radius: 15px;
  padding: 4%;
  display: flex;
}
.card-left {
  width: 40%;
}
.card-right {
  width: 60%;
}
.card-right-top {
  height: 50%;
  display: flex;
  align-items: center;
}
.card-right-top .text {
  font-size: 20px;
  font-weight: bold;
}
.card-right-bottom {
  height: 50%;
  display: flex;
  align-items: center;
}
.card-right-bottom-left {
  width: 70%;
}
.card-right-bottom-right {
  width: 30%;
  display: flex;
  justify-items: center;
  align-items: center;
}
.num {
  font-size: small;
}
.card-right-bottom .text {
  font-size: medium;
  font-weight: bold;
}
.card-right-bottom .num {
  font-size: small;
}
.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
</style>
