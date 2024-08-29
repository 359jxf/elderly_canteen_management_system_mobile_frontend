<script setup>

const onClickLeft = () => history.back();
const route = useRoute();
const order_detail = computed(() => {
    return route.query.detail ? JSON.parse(route.query.detail) : {};
});


</script>

<template>
    <div>
        <van-icon name="arrow-left" @click="onClickLeft" />
    </div>
     
    {{ order_detail }}
</template>