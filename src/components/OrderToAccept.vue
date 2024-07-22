<script setup>
const props = defineProps({
    order_detail: Object
})


const router = useRouter();
const toDetail=()=>{
    router.push({ path: '/OrderDetail', query: { detail:JSON.stringify(props.order_detail)} });
}
</script>

<template>
     <div class="order-cell" @click="toDetail">
        <div class="part1">
            <img :src="order_detail.DELIVER_OR_DINING ?
                'https://z4a.net/images/2024/07/22/waimai.png'
                : 'https://z4a.net/images/2024/07/22/tangshi.png'" />
            <p class="order-number">{{ order_detail.ORDER_ID }}</p>
            <van-icon name="arrow" size="4vw"></van-icon>
        </div>


        <div class="order-date">{{ order_detail.UPDATED_TIME }}</div>

        <div class="address">地址：{{ order_detail. CUS_ADDRESS}}</div>

    </div>

</template>

<style scoped>
.address {
    font-size:2vh;
    flex-grow: 1;

    display: flex;
    align-items: center;
    height: 100%;
    

}

.order-date {
    font-size: small;
    color: rgb(153, 151, 151);
    margin-top: 5px;
}

.part1 p {
    font-size: medium;
    margin-right: auto;
    font-weight: bold;

}

.part1 img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin-right: 5vw;
    /* 保持图片比例并裁剪 */
}

.part1 {
    display: flex;
    padding-top: 2.5%;
    align-items: center;
    justify-content: space-between;
}

.order-cell {
    display: flex;
    flex-direction: column;
    height: 15.5vh;
    border-radius: 15px;
    /* 圆角半径 */
    background-color: white;
    width: 90vw;
    padding-left: 6vw;
    padding-right: 6vw;
    padding-top: 1vh;
    padding-bottom: 1.5vh;
    margin-bottom: 10px;
}
</style>
