<script setup>
const order_number = 11111;
const order_date = "2024-07-11";
const order_address = "上海市";
</script>

<template>
    <div class="order-cell">
        <div class="part1">
            <img src="../assets/image/waimai.jpg" />
            <p class="order-number">{{ order_number }}</p>
            <van-icon name="arrow" size="4vw"></van-icon>
        </div>

        <div class="order-date">{{ order_date }}</div>

        <div class="address">地址：{{ order_address }}</div>

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

<script setup>

</script>