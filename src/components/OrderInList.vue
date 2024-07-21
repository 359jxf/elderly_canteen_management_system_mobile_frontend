<script setup>
const order_number = 11111;
const order_date = "2024-07-11";
const order_price = 23.45;

const props = defineProps({
  order_detail:Object
})

</script>

<template>
    <div class="order-cell">
        <div class="part1">
            <img :src="order_detail.DELIVER_OR_DINING? 
            '../assets/image/waimai.jpg'
            :'../assets/image/tangshi.jpg' " />
            <p class="order-number">{{ order_number }}</p>
            <van-icon name="arrow" size="4vw"></van-icon>
        </div>


        <div class="order-date">{{ order_date }}</div>

        <div class="part3">
            <div class="food-imgs">
                <img src="../assets/image/oldman.jpg"/>
                <img src="../assets/image/oldman.jpg"/>
            </div>
            <div class="price">¥{{ order_price }}</div>
        </div>

    </div>
</template>

<style scoped>
.food-imgs img{
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin-right: 2vh;
}
.food-imgs{
    height: 7.5vh;
}
.price {
    font-size:2.8vh;
    font-weight:bold;
}

.part3 {
    display: flex;
    justify-content: space-between;
    align-items:end;
    /* 如果需要垂直居中对齐 */
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
    height: 15.5vh;
    border-radius: 15px;
    /* 圆角半径 */
    background-color: white;
    width: 90vw;
    padding-left: 6vw;
    padding-right: 6vw;
    margin-bottom: 15px;
}
</style>

<script setup>

</script>