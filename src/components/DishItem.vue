<template>
  <div class="item">
    <div class="pic"><img :src="`/src/assets/${img}`" height="100px" width="130px" /></div>
    <div class="bottom">
      <div class="text">
        <div class="name">
          <span>{{ name }}</span>
        </div>
        <div class="price">
          <span v-if="props.discount < 1" class="original-price"
            >￥{{ originalPrice.toFixed(2) }}</span
          >
          <span v-if="props.discount < 1" class="discount-price">￥{{ discountPrice }}</span>
          <span v-else>￥{{ originalPrice.toFixed(2) }}</span>
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
import { computed } from 'vue'
const menu = useMenuStore()
const props = defineProps({
  img: String,
  name: String,
  price: String,
  category: String,
  discount: Number
})
const addItem = () => {
  const item = {
    name: props.name,
    price: props.price,
    category: props.category,
    img: props.img,
    discount: props.discount,
    quantity: 1
  }
  // 将菜品添加到菜单中
  menu.addItem(item)
  console.log(menu.items)
}
const originalPrice = parseFloat(props.price.replace('￥', '')) // 移除人民币符号并转换为数字
const discountPrice = computed(() => {
  return props.discount < 1 ? (originalPrice * props.discount).toFixed(2) : originalPrice.toFixed(2)
})
</script>
<style scoped>
.item {
  width: 100%;
  border-radius: 10px;
  margin: 3%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
}
.pic {
  margin: 3%;
}
.pic img {
  border-radius: 10px;
}
.bottom {
  width: 80%;
}
.text {
  margin-top: 15%;
  width: 100%;
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
  margin-left: 60%;
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
.original-price {
  text-decoration: line-through;
  color: gray;
}

.discount-price {
  color: red;
  font-weight: bold;
}
</style>
