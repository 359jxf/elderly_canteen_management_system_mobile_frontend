<template>
  <div>
    <!-- <NavBar title="订单详情" /> -->
    <Nav nav_text="订单详情" />
  </div>
  
  <div>
    <SimpleAddressCard :order_address="order_detail.CUS_ADDRESS" />
  </div>
  <div>
    <VolunteerCard />
  </div>
  <div>
    <OrderCard :order_detail="order_detail"/>
  </div>
  <div class="footer">
    <div class="info">
      <div class="header">
        <span style="font-weight: bold">用户备注</span>
      </div>
      <div class="mid">
        <span>{{ remark.remark }}</span>
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

<script setup>
import { useRemarkstore } from '@/store/modules/remark'
const remark = useRemarkstore();

const route = useRoute();
const order_detail = computed(() => {
    return route.query.detail ? JSON.parse(route.query.detail) : {};
});
</script>

<style scoped>
.top p {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    font-weight: bold;
}

.top img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin-right: 10px;
}

.top .van-icon {
    margin-left: 10px;
}

.top {
    height: 5vh;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    display: flex;
    font-size: large;
    font-weight: bold;
    /* position: relative; */

}
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
