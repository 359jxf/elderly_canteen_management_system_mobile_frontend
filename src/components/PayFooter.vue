<template>
  <div class="pay-footer">
    <div class="pay-footer-header">
      <span class="header-text">请选择支付方式</span>
    </div>
    <div class="pay-footer-icons">
      <van-radio-group v-model="checked" shape="dot" direction="horizontal">
        <div class="payment-option">
          <van-radio name="1">
            <img src="../assets/wechatpay.png" alt="微信支付" class="payment-icon" />
          </van-radio>
          <span class="payment-label">微信支付</span>
        </div>
        <div class="payment-option">
          <van-radio name="2">
            <img src="../assets/alipay.png" alt="支付宝" class="payment-icon" />
          </van-radio>
          <span class="payment-label">支付宝</span>
        </div>
      </van-radio-group>
    </div>
    <hr class="divider" />
    <div class="pay-footer-buttons">
      <van-button
        type="primary"
        class="order-button"
        :class="{ disabled: menu.items.length === 0 }"
        @click="jump"
      >
        立即下单
      </van-button>
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
.pay-footer {
  width: 100%;
  padding: 16px;
  background-color: #f9f9f9;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
}

.pay-footer-header {
  margin-bottom: 16px;
}

.header-text {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.pay-footer-icons {
  display: flex;
  justify-content: space-between; /* Adjusts spacing between items */
  margin-bottom: 16px;
}

.payment-option {
  display: flex;
  align-items: center;
  margin: 0 12px; /* Adds space between the payment options */
}

.payment-icon {
  height: 24px;
  width: 24px;
  margin-right: 8px;
}

.payment-label {
  font-size: 14px;
  color: #666;
}

.divider {
  border: 0;
  border-top: 1px solid #d0d0d5;
  margin: 16px 0;
}

.pay-footer-buttons {
  display: flex;
  justify-content: space-between;
}

.clear-button {
  flex: 1;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  margin-right: 8px;
}

.order-button {
  background-color: #ff9f00;
  color: #fff;
  border: none;
  width: 35%;
  margin-left: 60%;
}

.order-button.disabled {
  background-color: #d0d0d5;
  color: #666;
  cursor: not-allowed;
}
</style>
