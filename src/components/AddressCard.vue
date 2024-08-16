<template>
  <div class="addresscard">
    <div>
      <span class="title">填写收货地址</span>
    </div>
    <div class="addresscard-body">
      <div class="address-text">
        <div class="text">
          <input v-model="user.defaultAddr" class="text-input" placeholder="请输入地址" />
        </div>
      </div>
      <div class="address-pic">
        <img src="../assets/voice.png" class="voice-pic" />
      </div>
    </div>
    <hr class="hr-solid" />
    <span class="text"> 设为默认地址 </span>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/modules/user'
const user = useUserStore()
</script>

<style scoped>
.addresscard {
  margin: 4%;
  padding: 4% 8% 4% 8%;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
.title {
  font-size: large;
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
.hr-solid {
  border: 0;
  border-top: 1px solid #d0d0d5;
}
.addresscard .text {
  font-size: small;
}
.text-input {
  border: none;
  width: 100%;
}
</style>
