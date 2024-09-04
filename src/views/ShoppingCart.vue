<template>
  <div class="container">
    <Nav class="fixed-nav" nav_text="我的购物车" />
    <div class="content">
      <AddressCard />
      <OrderList />
      <RemarkItem />
    </div>
    <div class="footer">
      <van-button type="primary" class="order-button" @click="jumpToPay"> 立即下单 </van-button>
    </div>
  </div>
  <van-popup
    v-model:show="show"
    closeable
    :close-on-click-overlay="false"
    :style="{ height: '40%', width: '90%', padding: '20px', boxSizing: 'border-box' }"
    round
  >
    <div class="payment-container">
      <h3 class="balance">账户余额: <span>88 元</span></h3>
      <div class="payment-methods">
        <van-radio-group v-model="selectedMethod">
          <van-radio name="wechat" class="payment-option">
            <span class="icon">微信</span>
            <van-icon name="wechat-pay" class="icon-image" />
          </van-radio>
          <van-radio name="alipay" class="payment-option">
            <span class="icon">支付宝</span>
            <van-icon name="alipay" class="icon-image" />
          </van-radio>
        </van-radio-group>
      </div>

      <van-button type="primary" class="pay-button" @click="handlePay">支付</van-button>
    </div>
  </van-popup>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
const selectedMethod = ref('wechat')
const jumpToPay = () => {
  show.value = true
}
</script>

<style scoped>
.container {
  padding-top: 30px;
}
.content {
  flex: 1;
}
/* 固定在顶部的导航 */
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.order-button {
  background-color: #ff9f00;
  color: #fff;
  border: none;
  width: 35%;
  margin-left: 60%;
  margin-bottom: 2%;
}
.payment-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  box-sizing: border-box;
}

.balance {
  margin-top: 30px;
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: bold;
}

.payment-methods {
  margin-top: 16px;
  flex: 1;
}

.payment-option {
  display: flex;
  align-items: center;
  margin-bottom: 24px; /* 增加底部间距 */
  font-size: 20px; /* 增加字体大小 */
}

.icon {
  font-size: 20px; /* 增加图标字体大小 */
  margin-right: 12px; /* 增加右侧间距 */
}

.icon-image {
  font-size: 32px; /* 增加图标大小 */
}

.pay-button {
  width: 100%;
  padding: 12px;
}
</style>
