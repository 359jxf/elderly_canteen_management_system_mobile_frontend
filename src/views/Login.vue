<template>
  <slot></slot>
  <div>login</div>
  <div>{{ num }}</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import useStore from '../store'
const { user } = useStore()

// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { num } = storeToRefs(user)
</script>


<style lang="less" scoped></style>
