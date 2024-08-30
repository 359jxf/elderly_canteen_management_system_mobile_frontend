<template>
  <div class="review-box">
    <span class="title">备注</span>
    <textarea v-model="remark.remark" placeholder="请输入备注..." rows="5" cols="50"></textarea>
  </div>
</template>

<script setup>
import { useRemarkstore } from '@/store/modules/remark'
const remark = useRemarkstore()
</script>

<style scoped>
.review-box {
  margin: 20px;
  padding: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
}

.title {
  font-size: large;
  font-weight: bold;
  margin: 2%;
}
textarea {
  margin: 2%;
  width: 94%;
  padding: 2%;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
