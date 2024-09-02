<template>
  <div class="theHelloContainer">
    <img :src="portrait" alt="头像" class="helloImage" />
    你好，{{ accountName }}
  </div>
</template>

<script setup>
const accountName = localStorage.getItem('accountName')
const portrait = localStorage.getItem('portrait')
</script>

<style scoped>
.theHelloContainer {
  width: 80%;
  height: 12%;

  display: flex;
  position: relative;

  justify-content: center; /* 内容水平居中 */
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  border-radius: 15px; /* 四角圆滑 */

  top: -25%;
  left: 50%;
  transform: translate(-50%, -50%); /* 使容器在页面中居中 */

  font-size: 0.7rem;

  background-color: white;
}

.helloImage {
  position: relative; /* 相对定位 */
  left: -15%;
  top: 0%;
  width: auto;
  height: 70%;
  border-radius: 50%; /* 将图片设置为圆形 */
  object-fit: cover; /* 确保图片覆盖整个高度 */
}
</style>
