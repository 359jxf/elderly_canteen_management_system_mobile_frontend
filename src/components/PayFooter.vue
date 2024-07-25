<template>
  <div class="payfooter">
    <div class="payfooter-text">
      <span class="text">请选择支付方式</span>
    </div>
    <div class="payfooter-icon">
      <van-radio-group v-model="checked" shape="dot" direction="horizontal">
        <div class="left">
          <van-radio name="1"> <van-icon name="wechat-pay" /></van-radio>
        </div>
        <div class="right">
          <van-radio name="2"><van-icon name="alipay" /></van-radio>
        </div>
      </van-radio-group>
    </div>
    <hr class="hr-solid" />
    <div class="payfooter-button"></div>
    <div class="paybutton">
      <div class="left">
        <van-button type="primary" class="button-left">清空</van-button>
      </div>
      <div class="right">
        <van-button type="primary" class="button-right">立即下单</van-button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
</style>
