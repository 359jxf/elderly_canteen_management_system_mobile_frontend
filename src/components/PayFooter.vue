<template>
  <div class="payfooter">
    <div class="payfooter-text">
      <span class="text">请选择支付方式</span>
    </div>
    <div class="payfooter-icon">
      <van-radio-group v-model="checked" shape="dot" direction="horizontal">
        <div class="left">
          <van-radio name="1"> &nbsp;&nbsp;<img src="../assets/wechatpay.png" /></van-radio>
        </div>
        <div class="right">
          <van-radio name="2">&nbsp;&nbsp;<img src="../assets/alipay.png" /></van-radio>
        </div>
      </van-radio-group>
    </div>
    <hr class="hr-solid" />
    <div class="payfooter-button"></div>
    <div class="paybutton">
      <div class="left">
        <van-button type="primary" class="button-left" @click="myClear">清空</van-button>
      </div>
      <div class="right">
        <van-button
          type="primary"
          class="button-right"
          :class="{ disabled: menu.items.length === 0 }"
          @click="jump"
          >立即下单</van-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/store/modules/menu'
const menu = useMenuStore()
const checked = ref('1')
const router = useRouter()
const jump = () => {
  if (menu.items.length > 0) {
    router.push({ path: '/OrderDetail' })
  } else {
    console.log('菜单为空，无法跳转') // 或者使用其他方式提示用户
  }
}
const myClear = () => {
  menu.clearItems()
}
</script>

<style scoped>
.payfooter {
  width: 100%;
}
.payfooter-text {
  padding: 0% 8% 0% 8%;
  margin-bottom: 2%;
}
.payfooter .text {
  font-size: 18px;
}
.payfooter-icon {
  padding: 0% 8% 0% 8%;
}
.payfooter-icon .right {
  width: 47%;
  padding-left: 3%;
}
.payfooter-icon .left {
  width: 47%;
  padding-left: 3%;
}
.hr-solid {
  border: 0;
  border-top: 1px solid #d0d0d5;
}
.paybutton {
  padding: 0% 3% 2% 5%;
  display: flex;
}
.paybutton .left {
  width: 50%;
}
.paybutton .right {
  width: 50%;
}
.button-left {
  background-color: white;
  color: black;
  border: 1px solid grey;
  width: 60%;
}
.button-right {
  width: 90%;
  border: none;
  background-color: orange;
  color: black;
}
.button-right.disabled {
  background-color: gray; /* 禁用时的背景色 */
  color: white; /* 禁用时的字体颜色 */
  cursor: not-allowed; /* 禁用时的鼠标指针样式 */
}
</style>
