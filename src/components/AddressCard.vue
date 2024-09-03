<template>
  <div class="address-card">
    <div class="header">
      <span class="title">取餐地址</span>
    </div>
    <div class="body">
      <div class="address-input">
        <input v-model="user.addr" class="text-input" placeholder="请输入地址" />
      </div>
      <div class="voice-icon">
        <img src="../assets/voice.png" alt="语音输入" class="voice-pic" />
      </div>
    </div>
    <hr class="divider" />
    <div class="footer">
      <van-checkbox v-model="user.setDefault">
        <span class="checkbox-text">设为默认地址</span>
      </van-checkbox>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from '@/store/modules/user'
const user = useUserStore()
</script>
<style scoped>
.address-card {
  margin: 4%;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.header {
  margin-bottom: 12px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.body {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.address-input {
  flex: 1;
  margin-right: 8px;
}

.text-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.voice-icon {
  display: flex;
  align-items: center;
}

.voice-pic {
  height: 24px;
  width: 24px;
}

.divider {
  border: 0;
  border-top: 1px solid #ddd;
  margin: 12px 0;
}

.footer {
  display: flex;
  align-items: center;
}

.checkbox-text {
  font-size: 14px;
  color: #666;
}
</style>
