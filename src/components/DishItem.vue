<template>
  <div class="item">
    <div class="pic">
      <img :src="props.imageUrl" height="100px" width="130px" />
      <div v-if="badgeCount > 0" class="badge">{{ badgeCount }}</div>
    </div>
    <div class="bottom">
      <div class="text">
        <div class="name">
          <span>{{ props.dishName }}</span>
        </div>
        <div class="price">
          <span v-if="props.dishPrice !== props.discountPrice" class="original-price">
            ￥{{ props.dishPrice.toFixed(2) }}
          </span>
          <span v-if="props.dishPrice !== props.discountPrice" class="discount-price">
            ￥{{ props.discountPrice.toFixed(2) }}
          </span>
          <span v-else> ￥{{ props.dishPrice.toFixed(2) }} </span>
        </div>
        <div class="sale">
          <span>销量：{{ props.sales }}</span>
        </div>
      </div>
      <div class="button">
        <button class="plus-button" @click="addItem">＋</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useMenuStore } from '@/store/modules/menu'
import { computed } from 'vue'
const menu = useMenuStore()
const badgeCount = computed(() => {
  return menu.getItemCount(props.dishName)
})
const props = defineProps({
  imageUrl: String,
  dishId: String,
  dishName: String,
  dishPrice: Number,
  discountPrice: Number,
  category: String,
  sales: Number
})
const addItem = () => {
  const item = {
    dishName: props.dishName,
    quantity: 1
  }
  menu.addItem(item)
  console.log(badgeCount.value)
}
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
  position: relative; /* 使标记定位正确 */
}
.pic {
  margin: 3%;
  position: relative;
}
.pic img {
  border-radius: 10px;
}
.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
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
}
.name span {
  font-size: medium;
  font-weight: bold;
}
.price {
}
.price span {
  font-size: medium;
  font-weight: bold;
}
.button {
  margin-left: 60%;
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
  align-items: center;
  justify-content: center;
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
