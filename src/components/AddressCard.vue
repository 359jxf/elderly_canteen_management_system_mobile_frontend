<template>
  <div class="addresscard">
    <div>
      <span class="title">填写收货地址</span>
    </div>
    <div class="addresscard-body">
      <div class="address-text">
        <span class="text"> {{ address }}</span>
      </div>
      <div class="address-pic">
        <img src="../assets/voice.png" class="voice-pic" />
      </div>
    </div>
    <span class="text"> 设为默认地址 </span>
  </div>
</template>

<script setup>
defineProps({
  address: String
})
</script>

<style scoped>
.addresscard {
  margin: 4%;
  padding: 4% 8% 4% 8%;
  background-color: pink;
  border-radius: 7px;
}
.title {
  font-size: 700;
  font-weight: bold;
}
.addresscard-body {
  display: flex;
  align-items: center;
}
.address-text {
  width: 80%;
}
.addresscard .addresscard-body .address-text .text {
  font-size: 15px;
}
.address-pic {
  width: 20%;
}
.voice-pic {
  height: 40px;
  width: 40px;
}
.addresscard .text {
  font-size: small;
}
</style>
