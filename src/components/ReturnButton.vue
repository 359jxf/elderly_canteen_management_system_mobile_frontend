<template>
  <van-icon name="arrow-left" @click="handleClick" class="back" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  targetRoute: {
    type: Object,
    required: true
  }
})
const router = useRouter()

const handleClick = () => {
  router.push(props.targetRoute)
}
</script>

<style scoped>
.back {
  display: flex;
  align-items: center; /* 垂直居中 */

  opacity: 0.98;
  position: fixed;

  top: 10vw;
  left: 5vw;

  height: 12vw;
  width: 12vw;

  padding-left: 2vw;

  z-index: 1000;
  font-size: 100%;

  border-radius: 10px;

  color: black;

  background-color: white;
}
</style>
