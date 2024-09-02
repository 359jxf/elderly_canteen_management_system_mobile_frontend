<template>
  <van-row>
    <van-col span="3" class="search-line-icon">
      <button class="arrow-button" @click="goBack">
        <van-icon name="arrow-left" />
      </button>
    </van-col>
    <van-col span="18">
      <van-search v-model="searchValue" placeholder="请输入搜索关键词" />
    </van-col>
    <van-col span="3" class="search-line-icon">
      <div class="search-line-icon">
        <img :src="portrait" @click="clickPortrait" />
      </div>
    </van-col>
  </van-row>
</template>

<script setup>
import { ref } from 'vue'

import { defineEmits } from 'vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPorTrait } from '../api/api'
import { onMounted } from 'vue'
const searchValue = ref('')
const emit = defineEmits(['update:modelValue'])
const router = useRoute()
const goBack = () => {
  router.back()
}

watch(searchValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const portrait = ref()
const loadPortrait = async () => {
  const url = await getPorTrait()
  console.log('component get url:', url)
  portrait.value = url
  console.log('portrait:', portrait)
}
onMounted(loadPortrait)
const clickPortrait = () => {
  router.push({ path: '/User' })
}
</script>

<style scoped>
.arrow-button {
  background: none;
  border: none;
}
.search-line-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
