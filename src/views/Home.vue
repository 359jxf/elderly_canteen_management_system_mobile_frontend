<template>
  <div>我是一个大傻逼</div>
</template>

<script setup>
import { defineConfig } from 'vite'
import useStore from '../store'
const { user } = useStore()
const { num } = storeToRefs(user)
const a = ref(0)
function func() {
  a.value = user.Num_del_8
}
</script>

<style></style>
