<template>
  <div class="background">
    <div class="header" :class="{ password: true, selected: isPassword, unselected: !isPassword }" 
      @click="selectPassword">
      密码登录
    </div>
    <div class="header"  :class="{ credit: true, selected: !isPassword, unselected: isPassword }" 
      @click="selectCredit">
      验证码登录
    </div>
    <div class="loginBox" v-if=isPassword>
      <input class="input-item" v-model="username" placeholder="输入账号" />
      <input class="input-item" v-model="password" placeholder="输入密码" />
      <button class="loginBtn" @click="loginWithPassword">登录</button>
    </div>
    <div class="loginBox" v-else>
      <input class="input-item" v-model="username" placeholder="输入手机号" />
      <input class="input-item half" v-model="password" placeholder="输入验证码" />
      <button class="getBtn" @click="getCredit">获取验证码</button>
      <button class="loginBtn" @click="loginWithCredit">登录</button>
    </div>
    <button class="register" @click="register">新用户注册</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isPassword = ref(true);

const selectPassword = () => {
  isPassword.value = true;
};
const selectCredit = () => {
  isPassword.value = false;
};

const loginWithPassword = () => {
router.push({ name: 'Home' });
};
const loginWithCredit = () => {
router.push({ name: 'Home' });
};
const register = () => {
router.push({ name: 'Register' });
};
</script>

<style scoped>
.background{
  height: 100vh;
  width: 100%;

  position: relative;
  background-color: rgb(249, 207, 117);
}

.loginBox{
  position: relative;
  top: 30%;
  left: 10%;

  height: 30%;
  width: 80%;

  background-color: white;

  border-radius: 20px ;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); /* 阴影效果 */

  text-align: center;

  z-index: 2;
}

.header{
  position: absolute;
  top: 25%;

  height: 8%;
  width: 30%;

  text-align: center;
  font-weight: bold;
  font-size: 80%;
  background-color: white;
  border-radius: 10%;
}

.password{
  left: 15%;
}

.credit{
  left: 55%;
}

.selected{
  z-index: 4;
}

.unselected{
  z-index: 0;
}

.input-item{
  position: relative;
  top: 10%;

  width: 80%;
  height: 20%;;
  z-index: 6;

  margin-top: 5%;
  border-radius: 10px;
  font-size: 80%;
}

.half{
  width: 40%;
}

.loginBtn{
  position: relative;
  top: 20%;
  height: 15%;
  width: 40%;
  border-radius: 20px ; 
  background-color: rgb(232, 255, 195);
}

.getBtn{
  position: relative;
  top: 10%;
  height: 15%;
  width: 30%;
  border-radius: 10px ; 
  margin-left: 10%;
  background-color: white;
  font-size: 0.3rem;
}

.register{
  position: relative;
  top: 35%;
  left: 25%;
  width: 50%;
  height: 10%;
  background-color: white;
  border-radius: 30px ; 
  font-size: 80%;
}
</style>
