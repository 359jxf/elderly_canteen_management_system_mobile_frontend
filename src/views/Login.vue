<template>
  <div class="background">
    <div
      class="header"
      :class="{ password: true, selected: isPassword, unselected: !isPassword }"
      @click="selectPassword"
    >
      密码登录
    </div>
    <div
      class="header"
      :class="{ credit: true, selected: !isPassword, unselected: isPassword }"
      @click="selectCredit"
    >
      验证码登录
    </div>
    <div class="loginBox" v-if="isPassword">
      <input class="input-item" v-model="phoneNum" placeholder="输入手机号" />
      <input class="input-item" v-model="password" placeholder="输入密码" />
      <button class="loginBtn" @click="loginWithPassword">登 录</button>
      <p class="forgetPassword" @click="forgetPassword">忘记密码？</p>
    </div>
    <div class="loginBox" v-else>
      <input class="input-item" v-model="phoneNum" placeholder="输入手机号" />
      <input class="input-item half" v-model="verifyCode" placeholder="输入验证码" />
      <button class="getBtn" @click="getCredit">获取验证码</button>
      <button class="loginBtn" @click="loginWithCredit">登 录</button>
    </div>
    <button class="register" @click="register">新用户注册</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const isPassword = ref(true)

const phoneNum = ref('')
const password = ref('')
const verifyCode = ref('')

const selectPassword = () => {
  isPassword.value = true
}
const selectCredit = () => {
  isPassword.value = false
}

const loginWithPassword = async () => {
  try {
    const response = await axios.post('http://8.136.125.61/api/account/login', {
      phoneNum: phoneNum.value,
      password: password.value
    })
    if (response.data.loginSuccess) {
      const { token, identity, accountName } = response.data.response
      localStorage.setItem('token', token)
      localStorage.setItem('identity', identity)
      localStorage.setItem('accountName', accountName)

      router.push({ name: 'Home' })
    } else {
      alert('Login failed: ' + response.data.msg)
    }
  } catch (error) {
    console.error('Error logging in with password:', error)
    alert('An error occurred during login.')
  }
}

const loginWithCredit = async () => {
  try {
    const response = await axios.post('http://8.136.125.61/api/Account/sendOTP', {
      phoneNum: phoneNum.value,
      verifyCode: verifyCode.value
    })
    if (response.data.loginSuccess) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('identity', response.data.identity)
      console(response.data)

      router.push({ name: 'Home' })
    } else {
      alert('Login failed: ' + response.data.msg)
    }
  } catch (error) {
    console.error('Error logging in with credit:', error)
    alert('An error occurred during login.')
  }
}

const getCredit = async () => {
  const isValidPhoneNumber = /^\d{11}$/.test(phoneNum.value)
  if (!isValidPhoneNumber) {
    alert('手机号无效。必须是11位数字。')
    return
  }
  try {
    const response = await axios.post(
      'http://8.136.125.61/api/Account/sendOTP',
      {
        phone: phoneNum.value
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.value.success) {
      alert('发送成功')
    } else {
      alert('发送失败')
    }
  } catch (error) {
    console.error('请求失败:', error)
  }
}

const register = () => {
  router.push({ name: 'Register' })
}
</script>

<style scoped>
.background {
  height: 100vh;
  width: 100vw;

  position: relative;
  background-color: wheat;
}

.loginBox {
  position: relative;
  top: 30%;
  left: 10%;

  height: 40%;
  width: 80%;

  background-color: white;

  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); /* 阴影效果 */

  text-align: center;

  z-index: 2;
}

.header {
  position: absolute;
  top: 25%;

  height: 8%;
  width: 30%;

  text-align: center;
  font-weight: bold;
  font-size: 60%;
  background-color: white;
  border-radius: 10%;
}

.password {
  left: 15%;
}

.credit {
  left: 55%;
}

.selected {
  z-index: 4;
}

.unselected {
  z-index: 0;
}

.input-item {
  position: relative;
  top: 10%;

  width: 80%;
  height: 15%;
  z-index: 6;

  margin-top: 5%;
  border-radius: 10px;
  font-size: 60%;
}

.half {
  width: 40%;
}

.loginBtn {
  position: relative;
  top: 15%;
  height: 20%;
  width: 60%;
  border-radius: 20px;
  background-color: rgb(232, 255, 195);
  font-size: 70%;
  border: none;
  color: white;
  font-weight: bold;
  background-color: #ffa822;
  letter-spacing: 0.2rem;
}

.getBtn {
  position: relative;
  top: 10%;
  height: 15%;
  width: 30%;
  border-radius: 10px;
  margin-left: 10%;
  background-color: white;
  font-size: 40%;
}

.register {
  position: relative;
  top: 35%;
  left: 30%;
  width: 40%;
  height: 8%;
  border-radius: 30px;
  font-size: 60%;
  border: none;
  color: white;
  font-weight: bold;
  background-color: #ffa822;
  letter-spacing: 0.05rem;
}

.forgetPassword {
  position: relative;
  font-weight: bold;
  top: 20%;
  font-size: 60%;
}
</style>
