<script setup>
import useStore from '../store'
const { user } = useStore()
const { num } = storeToRefs(user)
let a = ref(0)
function func() {
  a.value = user.Num_del_8
}
</script>

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

<BottomTabbar nowView="home"/>
</template>

<style></style>
