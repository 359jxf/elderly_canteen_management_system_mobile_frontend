<template>
    <div class="container">
        <div class="head">
            <div class="top">
                <van-icon name="arrow-left" />
                <p>我的订单</p>
                <img src="../assets/image/oldman.jpg" />
            </div>

            <van-tabs v-model:active="active" title-active-color="rgb(249, 184, 62)">
                <van-tab title="全部"></van-tab>
                <van-tab title="外送"></van-tab>
                <van-tab title="堂食"></van-tab>
            </van-tabs>
        </div>


        <div class="orders">
            <div class="scroll">
                <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <OrderInList v-for="item in list"></OrderInList>
                </van-list>
            </div>
        </div>

        <BottomTabbar />
    </div>
</template>

<script setup>
const active = ref(0);
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
}
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