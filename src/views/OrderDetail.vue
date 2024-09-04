<template>
  <div class="container">
    <div class="head">
      <Nav nav_text="订单详情" />
    </div>

    <!-- 志愿者信息与订单内容 -->
    <div class="order_content">
      <!-- 配送地址 -->
      <div v-if="orderDetail.DELIVER_OR_DINING === true">
        <SimpleAddressCard :order_address="orderDetail.CUS_ADDRESS" />
      </div>

      <!-- 志愿者信息 -->
      <div>
        <VolunteerCard
          :orderId="orderDetail.ORDER_ID"
          :orderStatus="orderDetail.STATUS"
          :deliverOrDining="orderDetail.DELIVER_OR_DINING"
          :deliverStatus="orderDetail.DELIVER_STATUS"
          ref="volunteerCard"
        />
      </div>

      <!-- 订单信息 -->
      <div>
        <OrderCard :order_detail="orderDetail" />
      </div>

      <!-- 备注信息 -->
      <div class="remark">
        <div class="header">
          <span style="font-weight: bold">用户备注</span>
        </div>
        <div class="remarkContent">
          {{ orderDetail.REMARK }}
          <div class="test">
            以下为长文本测试 111111111111111111111111111111111111111111111111111111111111111111111
            111111111111111111111111111111111111111111111111111111111111111111111
            111111111111111111111111111111111111111111111111111111111111111111111
            111111111111111111111111111111111111111111111111111111111111111111111
            111111111111111111111111111111111111111111111111111111111111111111111
            111111111111111111111111111111111111111111111111111111111111111111111
          </div>
        </div>
      </div>
    </div>

    <!-- 按钮与投诉电话 -->
    <div class="footer">
      <div class="info">
        <div class="hotline">
          <span class="title">投诉电话</span>
          <span class="phone">1234567</span>
        </div>
      </div>
      <hr class="hr-solid" />
      <div class="buttonpt">
        <van-button
          :style="buttonStyle"
          class="button"
          @click="buttonEvent"
          :disabled="canClick === false"
        >
          {{ buttonText }}</van-button
        >

        <!-- ref="commentDialog"：获取子组件的引用。在 setup 中，可以使用commentDialog.value.showDialog();来访问子组件 -->
        <CommentDialog
          @exit="handleCommentExit"
          ref="commentDialog"
          :deliverOrDining="orderDetail.DELIVER_OR_DINING"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// 由于mock的订单信息快速过期，无法通过订单号查询，故暂时无法使用实际的刷新逻辑
// 按钮的逻辑同样无法彻底实现

import { onMounted } from 'vue'
import { postAccpetOrder } from '../api/api'

const route = useRoute()
const orderDetail = computed(() => {
  return route.query.detail ? JSON.parse(route.query.detail) : {}
})

const identity = localStorage.getItem('identity')
const buttonText = ref('请刷新')
const canClick = ref()

// 确定buttonText和canClick
const showButton = () => {
  // 用户-堂食-待确认-可点的确认取餐
  // 用户-外送-待确认、已送达-可点的确认取餐
  if (
    (identity == 'user' &&
      orderDetail.DELIVER_OR_DINING == false &&
      orderDetail.STATUS == '待确认') ||
    (identity == 'user' &&
      orderDetail.DELIVER_OR_DINING == true &&
      (orderDetail.DELIVER_STATUS == '已送达' || orderDetail.STATUS == '待确认'))
  ) {
    buttonText.value = '确认取餐'
    canClick.value = true
  }

  //用户-外送-待确认、待接单、已接单-不可点的确认取餐
  else if (
    identity == 'user' &&
    orderDetail.DELIVER_OR_DINING == true &&
    orderDetail.STATUS == '待确认' &&
    (orderDetail.DELIVER_STATUS == '待接单' || orderDetail.DELIVER_STATUS == '已接单')
  ) {
    buttonText.value = '确认取餐'
    canClick.value = false
  }

  // 用户-堂食、外送-已确认-可点的去评价
  else if (identity == 'user' && orderDetail.STATUS == '已确认') {
    buttonText.value = '去评价'
    canClick.value = true
  }

  // 用户-堂食、外送-已评价-可点的查看评价
  else if (identity == 'user' && orderDetail.STATUS == '已评价') {
    buttonText.value = '查看评价'
    canClick.value = true
  }

  // 志愿者-外送-待接单-可点的确认接单
  else if (
    identity == 'volunteer' &&
    orderDetail.DELIVER_OR_DINING == true &&
    orderDetail.DELIVER_STATUS == '待接单'
  ) {
    buttonText.value = '确认接单'
    canClick.value = true
  }
  // 志愿者-外送-已接单-可点的确认送达
  else if (
    identity == 'volunteer' &&
    orderDetail.DELIVER_OR_DINING == true &&
    orderDetail.DELIVER_STATUS == '已接单'
  ) {
    buttonText.value = '确认送达'
    canClick.value = true
  }
  // 志愿者-外送-已送达，待评价-不可点的查看评价
  else if (
    identity == 'volunteer' &&
    orderDetail.DELIVER_OR_DINING == true &&
    orderDetail.DELIVER_STATUS == '已送达' &&
    orderDetail.STATUS == '待评价'
  ) {
    buttonText.value = '查看评价'
    canClick.value = false
  }
  // 志愿者-外送-已评价-可点的查看评价
  else if (
    identity == 'volunteer' &&
    orderDetail.DELIVER_OR_DINING == true &&
    orderDetail.DELIVER_STATUS == '已送达' &&
    orderDetail.STATUS == '已评价'
  ) {
    buttonText.value = '查看评价'
    canClick.value = true
  }

  // 按钮的测试示例
  buttonText.value = '去评价'
  canClick.value = true
}
onMounted(showButton)

// 确定按钮颜色
import { computed } from 'vue'
const buttonStyle = computed(() => {
  if (
    buttonText.value == '确认取餐' ||
    buttonText.value == '确认接单' ||
    buttonText.value == '确认送达'
  ) {
    return {
      backgroundColor: 'orange'
    }
  } else {
    return {
      backgroundColor: '#d4ff79'
    }
  }
})

import { postConfirmOrder, getOrderMsg, postConfirmDelivered } from '../api/api'
// 确认接单
// #region
const accpetOrder = async () => {
  console.log('接单')
  const status = await postAccpetOrder(orderDetail.value.ORDER_ID)
  console.log('status:', status)
  switch (status) {
    case 200:
      showSuccessToast({
        message: '接单成功！',
        onClose: () => {
          console.log('确认接单foast消失')
          onRefresh()
        }
      })
      break
    case 400:
      showFailToast({
        message: '接单失败，请重试',
        onClose: () => {
          console.log('确认接单foast消失')
          onRefresh()
        }
      })
      break
  }
}
// #endregion

// 评价
// #region
const commentDialog = ref(null)

// 处理评价弹窗退出事件
const handleCommentExit = () => {
  console.log('检测到弹窗关闭')
  onRefresh()
}

// #endregion

// 目前的刷新无效，等待设定完善
const onRefresh = () => {
  console.log('刷新页面')
  showButton()
}

//实际的刷新逻辑

// const onRefresh = async() => {
//   console.log("刷新页面");
//   orderDetail.value=await getOrderMsg(orderDetail.value.ORDER_ID);
//   volunteerCard.value.fetchVolunteerMsg();
//   showButton();
// };

// 确认取餐
// #region
const confirmOrder = async () => {
  const status = await postConfirmOrder(orderDetail.ORDER_ID)
  console.log('status:', status)
  switch (status) {
    case 200:
      showSuccessToast({
        message: '确认取餐成功',
        onClose: () => {
          console.log('确认取餐foast消失')
          onRefresh()
        }
      })
      break
    case 400:
      showFailToast({
        message: '确认失败，请重试',
        onClose: () => {
          console.log('确认取餐foast消失')
          onRefresh()
        }
      })
      break
  }
}
// #endregion

import { showLoadingToast, showSuccessToast, showFailToast } from 'vant'
// 确认送达
const confirmDelivered = async () => {
  const status = await postConfirmDelivered(orderDetail.ORDER_ID)
  console.log('status:', status)
  switch (status) {
    case 200:
      showSuccessToast({
        message: '确认成功！',
        onClose: () => {
          console.log('确认送达foast消失')
          onRefresh()
        }
      })
      break
    case 400:
      showFailToast({
        message: '确认失败，请重试',
        onClose: () => {
          console.log('确认送达foast消失')
          onRefresh()
        }
      })
      break
  }
}

const buttonEvent = () => {
  if (buttonText.value == '确认取餐') {
    confirmOrder()
  } else if (buttonText.value == '去评价') {
    console.log('点击‘去评价’')
    commentDialog.value.writeComment()
  } else if (buttonText.value == '查看评价') {
    commentDialog.value.viewComment()
  } else if (buttonText.value == '确认接单') {
    /*若进入订单详情后，订单已被其他快递员接受，再点确认接单，失败后只要不退出详情页，能看到订单的后续状态*/
    accpetOrder()
  } else if (buttonText.value == '确认送达') {
    confirmDelivered()
  }
}
</script>

<style scoped>
.head {
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: white;
  width: 100%;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.order_content {
  flex: 1;
  /* 占据剩余空间 */
  overflow-y: auto;
  /* 允许垂直滚动 */

  margin-top: 5vh;
}

.remark {
  padding-top: 5%;
  padding-left: 6%;
  font-size: small;
  width: 100vw;
}

.remark .remarkContent {
  width: 88vw;
  word-wrap: break-word;
}

.footer {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background-color: white;
  width: 100%;
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
  margin-bottom: 10px;
  margin-top: 8px;
}

.buttonpt {
  padding-left: 48%;
  margin-bottom: 3%;
}

.button {
  width: 95%;
  height: 6.5vh;
  color: black;
  border: none;
  font-size: 20px;
  letter-spacing: 3px;
  border-radius: 12px;
  cursor: pointer;
}

.hotline .title {
  /*两个类之间的空格必不可省*/
  color: rgb(219, 95, 95);
  padding-right: 19px;
}

.hotline .phone {
  color: rgb(144, 149, 153);
  /* 设置电话号码的颜色为黑色 */
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
