<template>
    <ReturnPersonal />
    <PersonalBackground>
        <div class="header">志愿者申请</div>
        <div class="container">
            <textarea v-model="description" class="description"></textarea>
        </div>
        <button class="send" @click="sendApplication">提交</button>
    </PersonalBackground>
    <BottomTabbar nowView="user" />
</template>

<script setup>
</script>

<style scoped>
.container{
    position: relative;
    top: 12%;
    left: 10%;
    height: 50%;
    width: 80%;
    background-color: wheat;
    border-radius: 20px;
}

.description{
    position: relative;

    height: 90%;
    width: 90%;
    left: 5%;
    top: 5%;
    background-color: wheat;

    font-size: 60%;
}

.header{
    position: relative;
    font-weight: bold;
    font-size: 80%;
    text-align: center;
    top: 10%;
}

.send{
    position: relative;
    font-size: 60%;

    top: 15%;
    left: 30%;

    height: 10%;
    width: 40%;
}
</style>
