<template>
  <van-row>
    <van-col span="3" class="search-line-icon">
      <van-icon name="arrow-left" />
    </van-col>
    <van-col span="18">
      <van-search v-model="searchValue" placeholder="请输入搜索关键词" />
    </van-col>
    <van-col span="3" class="search-line-icon">
      <div class="search-line-icon">
        <img src="../assets/oldman.jpg" height="40" width="40" />
      </div>
    </van-col>
  </van-row>
</template>

<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'
import { watch } from 'vue'

const searchValue = ref('')
const emit = defineEmits(['update:modelValue'])

watch(searchValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped>
.search-line-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
