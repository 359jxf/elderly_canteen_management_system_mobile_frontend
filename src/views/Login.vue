<template>
  <div id="body">
    <div id="address-card">
      <div style="margin-left: 5%">收货地址</div>
      <div style="margin-left: 5%">xxx</div>
    </div>
    <div id="volunteer-information-card">
      <div id="card-left">
        <div style="margin-left: 10%; margin-bottom: 5%; margin-top: 5%">
          <span style="color: grey; font-size: 40px; font-weight: bold">0123</span>
        </div>
        <div style="margin-left: 10%; margin-bottom: 5%; margin-top: 5%">
          <span style="color: grey">志愿者:小明</span>
        </div>
      </div>
      <div id="card-right">
        <span>我是傻逼</span>
      </div>
    </div>
    <div id="order-card">
      <div id="card-header">
        <div style="margin-bottom: 5%">
          <span style="font-weight: bold; font-size: large">订单详情</span>
        </div>
        <van-row :gutter="[0, 10]">
          <van-col span="12">订单号</van-col>
          <van-col span="12" style="text-align: right">1234567</van-col>
          <van-col span="12">就餐方式</van-col>
          <van-col span="12" style="text-align: right">外卖</van-col>
          <van-col span="12">补贴消耗</van-col>
          <van-col span="12" style="text-align: right">无</van-col>
        </van-row>
      </div>
      <div id="card-mid">
        <div style="margin-bottom: 5%">
          <span style="font-weight: bold; font-size: large">购物车详情</span>
        </div>
        <van-row :gutter="[0, 5]">
          <van-col span="8">酸菜鱼</van-col>
          <van-col span="8" style="text-align: right">1份</van-col>
          <van-col span="8" style="text-align: right">2.00</van-col>
          <van-col span="8">酸菜鱼</van-col>
          <van-col span="8" style="text-align: right">1份</van-col>
          <van-col span="8" style="text-align: right">2.00</van-col>
          <van-col span="8">酸菜鱼</van-col>
          <van-col span="8" style="text-align: right">1份</van-col>
          <van-col span="8" style="text-align: right">2.00</van-col>
          <van-col span="8">酸菜鱼</van-col>
          <van-col span="8" style="text-align: right">1份</van-col>
          <van-col span="8" style="text-align: right">2.00</van-col>
        </van-row>
      </div>
      <div id="card-footer">
        <van-icon name="cash-o" />
        <span>总计</span>
        <span>8.00</span>
      </div>
    </div>
  </div>
  <div id="footer">
    <van-button color="orange" style="width: 150px"
      ><span style="color: black; font-weight: bold">确认取餐</span></van-button
    >
  </div>
</template>

<script setup></script>

<style scoped>
#search-line {
  width: 80%;
  display: flex;
  align-items: center;
}
.search-line-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
#title {
  font-size: 15px;
  font-weight: bold;
}
#body {
  height: 70%;
  margin: 5%;
}
#address-card {
  background-color: #d4ff79;
  border-radius: 10px;
  width: 100%;
}
#volunteer-information-card {
  width: 100%;
  height: 125px;
  margin-top: 3%;
  display: flex;
  align-items: center;
}
#card-left {
  width: 50%;
}
#card-right {
  width: 50%;
  background-color: blue;
}
#order-card {
  background-color: pink;
  border-radius: 15px;
  padding: 5%;
  font-size: 15px;
  color: black;
  padding-right: 10%;
}
#card-header {
  margin-bottom: 5%;
}
#card-mid {
  margin-bottom: 5%;
}
#card-footer {
  display: flex;
}
#footer {
  display: flex;
  float: right;
  margin-right: 5%;
  margin-bottom: 2%;
}
</style>
