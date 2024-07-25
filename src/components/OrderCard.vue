<template>
  <div class="orderCard">
    <div class="card-header">
      <div class="text">
        <span class="title">订单信息</span>
      </div>
      <div class="info">
        <van-row :gutter="[0, 10]">
          <van-col span="12">订单号</van-col>
          <van-col span="12" style="text-align: right">1234567</van-col>
          <van-col span="12">就餐方式</van-col>
          <van-col span="12" style="text-align: right">外卖</van-col>
          <van-col span="12">补贴消耗</van-col>
          <van-col span="12" style="text-align: right">无</van-col>
        </van-row>
      </div>
    </div>
    <hr class="hr-solid" />
    <div class="card-mid">
      <div class="text">
        <span class="title">购物车价格明细</span>
      </div>
      <div class="info">
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
    </div>
    <hr class="hr-solid" />
    <div class="card-footer">
      <div class="left">
        <img src="../assets/price.png" />
        <span class="text"> 总计</span>
      </div>
      <div class="right">
        <span class="text"> ￥23.50</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.orderCard {
  margin: 1% 6%;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 3% 6%;
}
.card-header .text {
  margin-bottom: 5%;
}
.card-header .text .title {
  font-weight: bold;
  font-size: large;
}
.card-header .info {
  font-size: small;
}
.hr-solid {
  border: 0;
  border-top: 1px solid #d0d0d5;
}
.card-mid .text {
  margin-bottom: 5%;
}
.card-mid .text .title {
  font-weight: bold;
  font-size: small;
}
.card-mid .info {
  font-size: small;
}
.card-footer {
  display: flex;
}
.card-footer .left {
  width: 80%;
}
.card-footer .left .text {
  font-weight: bold;
  font-size: medium;
}
.card-footer .right {
  width: 20%;
}
.card-footer .right .text {
  color: red;
  font-size: medium;
}
</style>
