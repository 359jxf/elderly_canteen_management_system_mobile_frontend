<script setup>

import { getAcceptableOrder, getAcceptedOrder, getFinishedOrder } from '../api/api';

const onClickLeft = () => history.back();
const active = ref('待送订单');
const listReady = ref(false); // 添加一个布尔变量以确保数据准备好
const orderList = ref([]);
const acceptedOrder = ref({});
const isAccepted=ref();
const fetchOrders = async () => {
  try {
    const response = await getAcceptableOrder();
    orderList.value = response;
    const response2 = await getAcceptedOrder();
    acceptedOrder.value = response2;

    isAccepted.value=(acceptedOrder!=null);///////

    listReady.value = true; // 数据准备好
    onLoad();
  } catch (error) {
    console.error('Error fetching orderList:', error);
  } finally {
    refreshing.value = false; // 确保在数据获取后重置 refreshing
  }
};
onMounted(fetchOrders);

const list = ref([]);//要传给OrderInList的数据
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const pageSize = 10; // 每次加载的数据量
let currentIndex = 0; // 当前已加载的索引

const onLoad = () => {
  // 确保数据准备好之后再加载。否则在页面刚打开时，onLoad会先于fetch以空数据加载
  if (!listReady.value) return;

  console.log("use", orderList.value);
  loading.value = true;

  try {
    // 获取当前索引到 pageSize 数据
    const nextData = orderList.value.slice(currentIndex, currentIndex + pageSize);
    list.value.push(...nextData);
    currentIndex += pageSize;


    // 检查是否加载完所有数据
    if (currentIndex >= orderList.value.length) {
      finished.value = true;
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  } finally {
    loading.value = false;
  }
}
const onRefresh = () => {
  // 清空列表数据
  list.value = [];
  finished.value = false;
  refreshing.value = true;
  currentIndex = 0; // 重置已加载的索引
  listReady.value = false;//不置false同样会使onLoad先加载一遍。
  fetchOrders();
};

const refreshingFinished = ref(false);
const listReady2 = ref(false); // 添加一个布尔变量以确保数据准备好
const orderList2 = ref([]);
const fetchFinishedOrders = async () => {
  try {
    const response = await getFinishedOrder();
    orderList2.value = response;
    listReady2.value = true; // 数据准备好
    onLoadFinished();
  } catch (error) {
    console.error('Error fetching orderList:', error);
  } finally {
    refreshingFinished.value = false; // 确保在数据获取后重置 refreshing
  }
};

const list2 = ref([]);//要传给OrderInList卡片的数据
const loading2 = ref(false);
const finished2 = ref(false);
const pageSize2 = 10; // 每次加载的数据量
let currentIndex2 = 0; // 当前已加载的索引
const onLoadFinished = () => {
  // 确保数据准备好之后再加载。否则在页面刚打开时，onLoad会先于fetch以空数据加载
  if (!listReady2.value) return;

  console.log("use", orderList2.value);
  loading2.value = true;

  try {
    // 获取当前索引到 pageSize 数据
    const nextData = orderList2.value.slice(currentIndex2, currentIndex2 + pageSize2);
    list2.value.push(...nextData);
    currentIndex2 += pageSize2;

    // 检查是否加载完所有数据
    if (currentIndex >= orderList2.value.length) {
      finished2.value = true;
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  } finally {
    loading2.value = false;
  }
}
const onRefreshFinished = () => {
  // 清空列表数据
  list2.value = [];
  finished2.value = false;
  refreshingFinished.value = true;
  currentIndex2 = 0; // 重置已加载的索引
  listReady2.value = false;//不置false同样会使onLoad先加载一遍。
  fetchFinishedOrders();
};

watch(active, (newActive) => {
  newActive == "待送订单" ? onRefresh() : onRefreshFinished();
});
</script>


<template>
  <div class="container">
    <div class="top">
      <van-icon name="arrow-left" @click="onClickLeft" />
      <p>志愿接单</p>
      <img src="../assets/image/oldman.jpg" />
    </div>

    <van-tabs v-model:active="active" title-active-color="rgb(249, 184, 62)">
      <van-tab title="待送订单" name="待送订单"></van-tab>
      <van-tab title="已送订单" name="已送订单"></van-tab>
    </van-tabs>

    <div class="acceptable" v-if="active === '待送订单'">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" v-if="active === '待送订单'">
        <div class="current-order">
          <div class="current-title">当前订单</div>

          <OrderToAccept :order_detail="acceptedOrder" :isAccepted="isAccepted" />
        </div>

        <div class="orders">
          <div class="order-title">可接订单</div>
          <div class="scroll">
            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <OrderToAccept v-for="item in list" :key="item.ORDER_ID" :order_detail="item" :isAccepted="isAccepted"></OrderToAccept>
            </van-list>
          </div>
        </div>
      </van-pull-refresh>

    </div>



    <div v-else class="finishedOrders">
      <van-pull-refresh v-model="refreshingFinished" @refresh="onRefreshFinished">
        <div class="finishedScroll">
          <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <OrderInList v-for="item in list2" :key="item.ORDER_ID" :order_detail="item"></OrderInList>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>


  </div>


</template>

<style scoped>
.acceptable {
  width: 100%;
  flex-grow: 1;
  background-color: rgba(244, 244, 244);
}

.finishedScroll {
  height: 85vh;
  overflow: auto;
  width: 90vw;

}

.finishedOrders {
  width: 100%;
  display: flex;
  flex-grow: 1;
  padding: 20px;
  background-color: rgba(244, 244, 244);
}


.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top p {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
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
  position: relative;
}

.order-title {
  font-size: large;
  font-weight: bold;
  margin-bottom: 10px;
}

.current-title {
  color: white;
  height: 5vh;
  align-items: center;
  width: 90vw;

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
  flex-grow: 1;
  padding: 20px;
}




.current-order {
  width: 100%;
  height: 25vh;
  background-color: rgb(249, 184, 62);
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
}
</style>
