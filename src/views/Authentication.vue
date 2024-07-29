<template>
    <ReturnPersonal />
    <PersonalBackground>
        <div class="header">实名认证</div>
        <div class="inputBox">
            <div class="row"><span class="label">真实姓名</span><input class="input" v-model="name"></div>
            <div class="row"><span class="label">身份证号</span><input class="input" v-model="num"></div>
        </div>
        <button class="send" @click="sendApplication">提交</button>
    </PersonalBackground>
    <BottomTabbar nowView="user" />
</template>

<script setup>

</script>
 
<style scoped>
.header{
    position: relative;
    font-weight: bold;
    font-size: 80%;
    text-align: center;
    top: 10%;
}

.inputBox{
    position: relative;
    height: 40%;
    top: 20%;

    width: 80%;
    left: 10%;
}

.row {
  display: flex;
  flex-direction: row;
  height: 40%;
}

.label{
    font-size: 80%;
    font-weight: bold;
    width: 30%;
}

.input{
    width: 70%;
    height: 50%;
    font-size: 60%;
    border-radius: 10px;
}

.send{
    position: relative;
    font-size: 60%;

    top: 15%;
    left: 30%;

    height: 10%;
    width: 40%;

    border-radius: 10px;
}
</style>
