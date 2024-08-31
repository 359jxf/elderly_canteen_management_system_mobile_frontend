<template>
  <ReturnButton :targetRoute="{ name: 'Login' }" />
  <div class="background">
    <div class="headerBox">新用户注册</div>
    <div class="registerBox">
      <div class="row">
        <span class="label">手机号码</span> <input class="inputBox" v-model="phone" />
      </div>
      <div class="row">
        <span class="label">账户名称</span> <input class="inputBox" v-model="userName" />
      </div>
      <div class="row">
        <span class="label">账户密码</span> <input class="inputBox" v-model="password" />
      </div>
      <div class="row">
        <span class="label">性 别</span> <input class="inputBox" v-model="gender" />
      </div>
      <div class="row">
        <span class="label">验证码</span>
        <input class="inputBox half" v-model="verificationCode" /><button
          class="verifyBtn"
          @click="getCredit"
        >
          发送
        </button>
      </div>
      <button class="getIn" @click="getIn">注册</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
//import axios from 'axios';

const router = useRouter()

const phone = ref('')
const userName = ref('')
const password = ref('')
const gender = ref('')
const verificationCode = ref('')

const getIn = () => {
  router.push({ name: 'Home' })
}
</script>

<style>
.background {
  display: flex;
  position: relative;
  flex-direction: column; /* 使子元素按列布局 */
  top: 0;

  height: 100vh;
  width: 100vw;

  background-color: #ffa822;
}

.registerBox {
  position: relative;
  height: 70%;
  top: 9%;
  width: 80%;
  left: 10%;
  background-color: white;
  border-radius: 20px;

  z-index: 1;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

.headerBox {
  position: relative;
  height: 5%;
  top: 10%;
  width: 60%;
  left: 20%;
  background-color: white;
  font-weight: bold;
  font-size: 80%;
  text-align: center;
  border-radius: 10px;

  z-index: 3;
  box-shadow: 0 -7px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

.row {
  top: 10%;
  left: 10%;
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 12%;
}

.label {
  width: 20%;
  font-weight: bold;
  font-size: 60%;
  min-width: 25%;
  text-align: left;
}

.inputBox {
  width: 50%;
  height: 60%;
  border-radius: 10px;
}

.half {
  width: 25%;
  height: 50%;
}

.verifyBtn {
  position: relative;
  width: 20%;
  height: 50%;
  left: 5%;
  border-radius: 5px;
  font-size: 70%;
}

.getIn {
  position: relative;
  width: 40%;
  height: 10%;
  left: 30%;
  top: 10%;
  border-radius: 20px;
  font-size: 60%;
}
</style>
