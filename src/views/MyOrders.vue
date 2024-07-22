<template>
    <div class="container">
        <div class="head">
            <div class="top">
                <van-icon name="arrow-left" @click="onClickLeft" />
                <p>我的订单</p>
                <img src="../assets/image/oldman.jpg" />
            </div>

            <van-tabs v-model:active="active"  swipeable 
            title-active-color="rgb(249, 184, 62)" @change="onRefresh">
                <van-tab title="全部" name="all"></van-tab>
                <van-tab title="外送" name="deliver"></van-tab>
                <van-tab title="堂食" name="dining"></van-tab>
            </van-tabs>
        </div>


        <div class="orders">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <div class="scroll">
                    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <OrderInList v-for="item in filteredList" :key="item.ORDER_ID" :order_detail="item"></OrderInList>
                    </van-list>
                </div>
            </van-pull-refresh>
        </div>
        <BottomTabbar nowView="orders" />

    </div>
</template>

<script setup>
import { getOrders } from '../api/api';


const onClickLeft = () => history.back();
const active = ref('all');
const listReady = ref(false); // 添加一个布尔变量以确保数据准备好
const orderList = ref([]);
const fetchOrders = async () => {
    try {
        const response = await getOrders();
        orderList.value = response; 
        listReady.value = true; // 数据准备好
        onLoad();
    } catch (error) {
        console.error('Error fetching orderList:', error);
    } finally {
        refreshing.value = false; // 确保在数据获取后重置 refreshing
    }
};
onMounted(fetchOrders);


const list = ref([]);//要传给OrderInList卡片的数据
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const pageSize = 10; // 每次加载的数据量
let currentIndex = 0; // 当前已加载的索引
const filteredList = computed(() => {
  if (active.value === 'all') {
    return list.value;
  } else if (active.value === 'deliver') {
    return list.value.filter(item => item.DELIVER_OR_DINING === true); // 外送
  } else if (active.value === 'dining') {
    return list.value.filter(item => item.DELIVER_OR_DINING === false); // 堂食
  }
  return list.value;
});
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
    listReady.value=false;//不置false同样会使onLoad先加载一遍。
    fetchOrders();
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.van-tabs {
    height: 5vh;
}

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



.scroll {
    height: 81.6vh;
    overflow: auto;
    width: 90vw;

}

.orders {
    width: 100%;
    display: flex;
    flex-grow: 1;
    padding: 20px;
    background-color: rgba(244, 244, 244);
}
</style>