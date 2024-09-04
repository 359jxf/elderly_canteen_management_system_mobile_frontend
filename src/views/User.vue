<template>
  <PersonalBackground :ava="preview">
  <div class="textContainer">
      <span class="head">个人信息</span>
      <button class="info-button" @click="alterInformation">🖊</button>
      <div class="space"></div>
      <div class="row"><span class="label">ID:</span> <span class="value">{{ userData.accountId }}</span></div>
      <div class="row"><span class="label">姓名:</span> <span class="value">{{ userData.name }}</span></div>
      <div class="row"><span class="label">联系方式:</span> <span class="value">{{ userData.phoneNum }}</span></div>
      <div class="row"><span class="label">性别:</span> <span class="value">{{ userData.gender }}</span></div>
      <div class="row"><span class="label">出生日期:</span> <span class="value">{{ userData.birthDate }}</span></div>
      <div class="row"><span class="label">地址:</span> <span class="value">{{ userData.address }}</span></div>
      <div class="row"><span class="label">账户余额</span> <span class="value">{{ userData.money }}</span><van-icon name="gold-coin-o" class="prePaid" size="7vw" @click="prePaid"/></div>
    </div>
    <div class="buttonContainer">
      <button class="buttonType authen" @click="authen">实名认证</button>
      <button class="buttonType apply" @click="apply">志愿者申请</button>
    </div>
    <van-dialog v-model:show="show" title="账户充值" show-cancel-button @confirm="ensurePrepaid">
      <div class="input-container">
        <input v-model="prePaidMoney" placeholder="输入充值金额" class="prePaidInput"/>
      </div>
    </van-dialog>
  </PersonalBackground>

  <BottomTabbar nowView="user" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import 'vant/es/toast/style'
import { showToast } from 'vant'

import defaultPic from '@/assets/testpic.jpg';

const router = useRouter();
const getSuccess = ref(false);
const preview = ref('');
const show = ref(false);
const prePaidMoney = ref('')

const userData = ref({
  accountId: '',
  accountName: '',
  phoneNum: '',
  identity: '',
  portrait:'',
  gender: '',
  birthDate: '',
  address: '',
  name: '',
  money: ''
});

const fetchData = async () => {
try {
  // 从 localStorage 中获取保存的 Token
  const token = localStorage.getItem('token');

  // 使用 axios 发起 GET 请求，附带 Authorization 头
  const response = await axios.get('http://8.136.125.61/api/account/getPersonInfo', {
    headers: {
      Authorization: `Bearer ${token}`  // 将 Token 添加到 Authorization 头中
    }
  });

  if (response.data.getSuccess === true) {
    console.log(response.data.response); // 调试用
    getSuccess.value = true;
    userData.value = response.data.response;
    preview.value = userData.value.portrait ? userData.value.portrait : defaultPic;
    
    localStorage.setItem('portrait', preview.value);
    localStorage.setItem('name', userData.value.name);
  } else {
    showToast('获取信息失败'+response.data.msg)
  }
} catch (error) {
  showToast('获取信息失败')
}
};

const ensurePrepaid = async () => {
  const token = localStorage.getItem('token');
  if(prePaidMoney.value===''){
    showToast('请输入充值金额');
    return;
  }
  try {
    const data = {
      money:prePaidMoney.value,
    };

    const response = await axios.post(
      "http://8.136.125.61/api/Account/prePaid",
      data,
      {
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        }
      }
    );
    if (response.data.success) {
      showToast('充值成功')
    } else {
      showToast('充值失败')
    }
  } catch (error) {
  showToast('充值失败')
  }
};


onMounted(() => {
  fetchData();
});

const alterInformation = () => {
router.push({ name: 'Alter' });
};

const authen = () => {
router.push({ name: 'Authen' });
};

const prePaid = () => {
  show.value = true;
};

const apply = () => {
  const name = localStorage.getItem('name')
  if(name === null){
    showToast('未实名用户不能进行志愿者申请')
    return;
  }
  router.push({ name: 'Apply' });
};
</script>

<style scoped>
.prePaid{
  position: relative;
  left: 20vw;
}

.input-container{
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.prePaidInput{
  height: 5vh;
}

.head{
font-weight: bold;
font-size: 120%;
}

.space{
height: 8%
}

.row {
left: 0%;
top: 0%;
display: flex;
flex-direction: row;
width: 80vw;
height: 10%;
}

.label{
font-weight: bold;
min-width: 30%;
text-align: left;
font-size: 100%;
}

.value {
text-align: left;
font-size: 100%;

}

.info-button{
  border-radius: 50%;
  background-color: #ffa822;
  margin-left: 10%;
  border: none;
  color: white;
  font-weight: bold;
}

.errorContainer,.textContainer {
  position: relative;
  top: 10%;
  height: 60%;
  font-size: 0.4rem;
  padding-left: 15%; /* 调整左侧距离 */
  
  z-index: 10;
}

.buttonContainer{
display: flex;
flex-direction: column;
color: white;
font-weight: bold;
height: 40%;
width: 100%;
}

.buttonType{
  position: relative;
  font-size: 60%;

  height: 25%;
  width: 50%;

  left: 25%;
  background-color: #ffa822;
  border-radius: 10px ;
  z-index: 10;

  border: none;
}

.authen{
top: 5%;
}

.apply{
top: 15%;
}

</style>