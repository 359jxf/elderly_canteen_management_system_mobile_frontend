<template>
  <div class="volunteercard">
    <div class="card-left">
      <div>
        <span class="num">0123</span>
      </div>
      <div>
        <span class="name">志愿者: 王小明</span>
      </div>
    </div>
    <div class="card-right"><img src="../assets/order_state1.png" /></div>
  </div>
</template>

<script setup></script>

<style scoped>
.volunteercard {
  padding: 3% 5% 5% 12%;
  display: flex;
}
.card-left {
  width: 60%;
}
.num {
  font-size: 50px;
  color: grey;
  font-weight: bold;
}
.name {
  color: grey;
  font-weight: bold;
}
.card-right {
  padding-top: 3%;
  width: 40%;
}
</style>
