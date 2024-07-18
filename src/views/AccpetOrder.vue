<script setup>
import OrderCell from '@/components/OrderCell.vue';

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};



</script>


<template>

  <div class="top">
    <van-icon name="arrow-left" />
    <p>志愿接单</p>
    <img src="../assets/image/oldman.jpg"/>
  </div>

  <van-tabs v-model:active="active" title-active-color="rgb(249, 184, 62)">
    <van-tab title="待送订单"></van-tab>
    <van-tab title="已送订单"></van-tab>
  </van-tabs>

  <div class="current-order">
    <div class="current-title">当前订单</div>

    <OrderCell/>
  </div>

  <div class="orders">
    <div class="order-title">可接订单</div>
    <div class="scroll">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <OrderCell v-for="item in list"></OrderCell>
      </van-list>
    </div>
  </div>

</template>

<style scoped>

.top img{
  max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin-right: 10px; 
}
.top .van-icon{
  margin-left: 10px; 
}
.order-title{
  font-size:large;
  font-weight: bold;
  margin-bottom: 10px;
}

.current-title {
  color: white;
  height: 5vh;
  align-items: center;
  width:90vw;

  font-size: large;
  font-weight: bold;
  letter-spacing: 0.2vh;
}

.van-tab {
  height: 5vh;
}

.title {
  margin-top: 3vh;
  margin-bottom: 3vh;
  width: 100%;
}

.scroll {
  height: 51vh;
  overflow: auto;
  width: 90vw;
}

.orders {
  width: 100%;
  height: 66vh;
  padding: 20px;
  background-color: rgba(244, 244, 244);
}


.top {
  height: 5vh;
  align-items: center;
  justify-content: space-between;
  display: flex;
  font-size: large;
  font-weight: bold;
  position: relative;
}

.current-order {
  width: 100%;
  height: 24vh;
  background-color: rgb(249, 184, 62);
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items:center;
}
</style>
