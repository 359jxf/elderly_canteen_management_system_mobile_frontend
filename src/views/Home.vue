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

<<<<<<< HEAD
=======
<template>
  <div>home</div>
  <p>{{ a }}</p>
  <div><van-button type="success">成功按钮</van-button></div>
  <button @click="func">+1111111</button>
  <p>{{ num }}</p>
  <p>{{ user.num }}</p>
  <div><router-link to="/login">tiao</router-link></div>
  <Login>组件自动引用测试</Login>
  <van-row :gutter="[20, 20]">
  <van-col span="12">span: 12</van-col>
  <van-col span="12">span: 12</van-col>
  <van-col span="12">span: 12</van-col>
  <van-col span="12">span: 12</van-col>
</van-row>
</template>

>>>>>>> cc57eae6ff944b82bdac80cdcfa9b1e8ca860bb9
<style></style>
