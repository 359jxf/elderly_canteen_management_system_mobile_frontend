<template>
  <div>
    <NavBar title="订单详情" />
  </div>
  <div>
    <SimpleAddressCard />
  </div>
  <div>
    <VolunteerCard />
  </div>
  <div>
    <OrderCard />
  </div>
  <div class="footer">
    <div class="info">
      <div class="header">
        <span style="font-weight: bold">用户备注</span>
      </div>
      <div class="mid">
        <span>请放一楼大厅桌子</span>
      </div>
      <div>
        <span style="color: red">投诉电话</span>
        <span>&nbsp;&nbsp;1234567</span>
      </div>
    </div>
    <hr class="hr-solid" />
    <div class="buttonpt">
      <van-button type="primary" class="button">确认取餐</van-button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.footer .info {
  padding-top: 2%;
  padding-left: 6%;
  font-size: small;
}
.footer .info .header {
  margin-bottom: 2%;
}
.footer .info .mid {
  margin-bottom: 10%;
}
.hr-solid {
  border: 0;
  border-top: 1px solid #d0d0d5;
}
.buttonpt {
  padding-left: 50%;
  margin-bottom: 1%;
}
.button {
  width: 90%;
  background-color: orange;
  color: black;
  border: none;
}
</style>
