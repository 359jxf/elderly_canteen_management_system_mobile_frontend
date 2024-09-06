<template>
  <ReturnButton :targetRoute="{ name: 'Login' }" />
  <div class="background">
    <div class="headerBox">新用户注册</div>
    <div class="registerBox">
      <div class="row">
        <span class="label">手机号码</span> <input class="inputBox" v-model="phoneNum" />
      </div>
      <div class="row">
        <span class="label">账户名称</span> <input class="inputBox" v-model="userName" />
      </div>
      <div class="row">
        <span class="label">账户密码</span> <input class="inputBox" v-model="password" />
      </div>
      <div class="row">
        <span class="label">性别</span>
        <select v-model="gender" class="inputBox">
          <option value="">选择性别</option>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </div>
      <div class="row">
        <span class="label">更改头像</span>
        <input
          type="file"
          accept="image/*"
          @change="onImageSelected"
          style="display: none"
          ref="fileInput"
        />
        <van-image
          :src="imageUrl || defaultPic"
          class="image-picker"
          round
          fit="cover"
          @click="triggerFileInput"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="row">
        <span class="label">验证码</span>
        <input class="inputBox half" v-model="verificationCode" />
        <button class="getBtn" @click="getCredit" :disabled="isCountingDown">
          {{ buttonText }}
        </button>
      </div>
      <button class="getIn" @click="getIn">注册</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import 'vant/es/toast/style'
import { showToast } from 'vant'
import defaultPic from '@/assets/image/oldman.jpg'
const router = useRouter()
const selectedImage = ref(null) // 初始化为null而不是空字符串
const imageUrl = ref('')

const fileInput = ref(null)
const phoneNum = ref('')
const userName = ref('')
const password = ref('')
const gender = ref('')

const verificationCode = ref('')

const isCountingDown = ref(false) // 是否在倒计时
const buttonText = ref('获取') // 按钮显示文字
const countDownTime = ref(60) // 倒计时时间（秒）
let timer = null // 计时器

const triggerFileInput = () => {
  fileInput.value.click() // 触发文件选择
}
const onImageSelected = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedImage.value = file // 保存所选的图片文件
    imageUrl.value = URL.createObjectURL(file) // 生成本地 URL 用于预览
  }
}

const getIn = async () => {
  try {
    const formData = new FormData()
    formData.append('userName', userName.value)
    formData.append('gender', gender.value)
    formData.append('verificationCode', verificationCode.value)
    formData.append('phone', phoneNum.value)
    formData.append('password', password.value)
    formData.append('avatar', selectedImage.value)
    const response = await axios.post('http://8.136.125.61/api/account/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.registerSuccess) {
      if (userName.value !== '') {
        localStorage.setItem('accountName', userName.value)
      }
      const { token, identity, accountName } = response.data.response
      localStorage.setItem('token', token)
      localStorage.setItem('identity', identity)
      localStorage.setItem('accountName', accountName)

      router.push({ name: 'Home' })
    } else {
      showToast('注册失败：' + response.data.msg)
    }
  } catch (error) {
    showToast('注册失败')
  }
}

const getCredit = async () => {
  if (isCountingDown.value) return
  const isValidPhoneNumber = /^\d{11}$/.test(phoneNum.value)
  if (!isValidPhoneNumber) {
    showToast('手机号无效，必须是11位数字。')
    return
  }
  try {
    const response = await axios.post('http://8.136.125.61/api/Account/sendOTP', {
      phoneNum: phoneNum.value
    })
    console.log(response)
    console.log(response.data.success)
    if (response.data.success) {
      showToast('发送成功')
      startCountDown()
    } else {
      showToast('发送失败')
    }
  } catch (error) {
    showToast('发送失败')
  }
}

// 开始倒计时
const startCountDown = () => {
  isCountingDown.value = true
  buttonText.value = `${countDownTime.value} 秒`

  timer = setInterval(() => {
    countDownTime.value--
    buttonText.value = `${countDownTime.value} 秒`

    if (countDownTime.value <= 0) {
      clearInterval(timer)
      resetButton()
    }
  }, 1000)
}

// 重置按钮状态
const resetButton = () => {
  isCountingDown.value = false
  countDownTime.value = 60
  buttonText.value = '获取'
}
</script>

<style scoped>
.image-picker {
  width: 12vw;
  height: 12vw;
  cursor: pointer;
  object-fit: cover;
  left: 5vw;
}

.background {
  position: relative;
  top: 0;

  height: 210vw;
  width: 100vw;

  background-image: url('@/assets/loginBack.jpg'); /* 使用本地图片作为背景 */

  background-size: cover; /* 确保背景图片覆盖整个容器 */
}

.registerBox {
  opacity: 0.98;
  position: relative;
  height: 140vw;
  top: 24vw;
  width: 80%;
  left: 10%;
  background-color: white;
  border-radius: 20px;

  z-index: 1;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

.headerBox {
  opacity: 0.98;
  position: relative;
  height: 11vw;
  top: 26vw;
  width: 60vw;
  left: 20%;
  background-color: white;

  font-weight: bold;
  font-size: 5vw;
  text-align: center;
  border-radius: 10px;

  z-index: 3;
  box-shadow: 0 -7px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

.getBtn {
  position: relative;
  top: 0;
  height: 9vw;
  width: 15vw;
  border-radius: 10px;
  margin-left: 5vw;
  background-color: white;
  font-size: 3vw;
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
  font-size: 4vw;
  min-width: 25%;
  text-align: left;
}

.inputBox {
  width: 50%;
  height: 50%;
  border-radius: 1vh;
  font-size: 3.5vw;
  border: 2px solid #000;
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
  font-size: 3vw;
}

.getIn {
  position: relative;
  width: 40%;
  height: 10%;
  left: 30%;
  top: 10%;
  border-radius: 20px;
  font-size: 5vw;
  border: none;
  color: white;
  font-weight: bold;
  background-color: #ffa822;
}
</style>
