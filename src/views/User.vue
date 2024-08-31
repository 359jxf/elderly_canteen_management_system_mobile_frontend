<template>
  <PersonalBackground>
    <div class="textContainer" v-if="getSuccess">
      <span class="head">个人信息</span>
      <button class="info-button" @click="alterInformation">🖊</button>
      <div class="space"></div>
      <div class="row">
        <span class="label">ID:</span> <span class="value">{{ userData.accountId }}</span>
      </div>
      <div class="row">
        <span class="label">姓名:</span> <span class="value">{{ userData.name }}</span>
      </div>
      <div class="row">
        <span class="label">联系方式:</span> <span class="value">{{ userData.phoneNum }}</span>
      </div>
      <div class="row">
        <span class="label">性别:</span> <span class="value">{{ userData.gender }}</span>
      </div>
      <div class="row">
        <span class="label">出生日期:</span> <span class="value">{{ userData.birthDate }}</span>
      </div>
      <div class="row">
        <span class="label">地址:</span> <span class="value">{{ userData.address }}</span>
      </div>
    </div>
    <div class="errorContainer" v-else>
      <p>{{ errorMessage }}</p>
    </div>
    <div class="buttonContainer">
      <button class="buttonType authen" @click="authen">实名认证</button>
      <button class="buttonType apply" @click="apply">志愿者申请</button>
    </div>
  </PersonalBackground>

  <BottomTabbar nowView="user" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import defaultPic from '@/assets/Yui.jpg'

const router = useRouter()
const getSuccess = ref(false)
const errorMessage = ref('')
const preview = ref(defaultPic)

const userData = ref({
  accountId: '',
  accountName: '',
  phoneNum: '',
  identity: '',
  portrait: '',
  gender: '',
  birthDate: '',
  address: '',
  name: ''
})

const fetchData = async () => {
  try {
    // 从 localStorage 中获取保存的 Token
    const token = localStorage.getItem('token')

    // 使用 axios 发起 GET 请求，附带 Authorization 头
    const response = await axios.get('http://8.136.125.61/api/account/getPersonInfo', {
      headers: {
        Authorization: `Bearer ${token}` // 将 Token 添加到 Authorization 头中
      }
    })

    if (response.data.getSuccess === true) {
      console.log(response.data.response) // 调试用
      getSuccess.value = true
      userData.value = response.data.response
      preview.value = userData.value.portrait
        ? `http://8.136.125.61/images/${userData.value.portrait}`
        : defaultPic

      localStorage.setItem('name', userData.value.name)
    } else {
      getSuccess.value = false
      errorMessage.value = response.data.msg
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    getSuccess.value = false
    errorMessage.value = 'Failed to fetch data'
  }
}

onMounted(() => {
  fetchData()
})

const alterInformation = () => {
  router.push({ name: 'Alter' })
}

const authen = () => {
  router.push({ name: 'Authen' })
}

const apply = () => {
  router.push({ name: 'Apply' })
}
</script>

<style scoped>
.head {
  font-weight: bold;
  font-size: 120%;
}

.space {
  height: 8%;
}

.row {
  left: 0%;
  top: 0%;
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 10%;
}

.label {
  font-weight: bold;
  min-width: 30%;
  text-align: left;
  font-size: 100%;
}

.value {
  text-align: left;
  font-size: 100%;
}

.info-button {
  border-radius: 50%;
  background-color: #ffa822;
  margin-left: 10%;
  border: none;
  color: white;
  font-weight: bold;
}

.errorContainer,
.textContainer {
  position: relative;
  top: 10%;
  height: 60%;
  font-size: 0.4rem;
  padding-left: 15%; /* 调整左侧距离 */

  z-index: 10;
}

.buttonContainer {
  display: flex;
  flex-direction: column;
  color: white;
  font-weight: bold;
  height: 40%;
  width: 100%;
}

.buttonType {
  position: relative;
  font-size: 60%;

  height: 25%;
  width: 50%;

  left: 25%;
  background-color: #ffa822;
  border-radius: 10px;
  z-index: 10;

  border: none;
}

.authen {
  top: 5%;
}

.apply {
  top: 15%;
}
</style>
