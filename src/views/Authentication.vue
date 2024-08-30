<template>
  <ReturnButton :targetRoute="{ name: 'User' }" />
  <PersonalBackground>
      <div class="header">实名认证</div>
      <div class="inputBox">
          <div class="row"><span class="label">真实姓名</span><input class="input" v-model="name"></div>
          <div class="row"><span class="label">身份证号</span><input class="input" v-model="IDCard"></div>
      </div>
      <div class="tips">请注意：仅通过实名认证的老人才可享受爱心外卖服务</div>
      <button class="send" @click="sendApplication">提 交</button>
      <div class="tips second">请注意：一旦完成实名认证，无法修改</div>
  </PersonalBackground>
  <BottomTabbar nowView="user" />
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();


const name = ref(null);
const IDCard = ref(null);

const sendApplication = async () => {
const token = localStorage.getItem('token');
try {
  const data = {
    name:name.value,
    IDCard:IDCard.value
  };

  const response = await axios.post(
    'http://8.136.125.61/api/Account/nameAuthenticate',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  console.log('Response:', response);
  if (response.data.success) {
    router.push({ name: 'User' });
  } else {
    alert('更新失败: ' + response.data.message);
  }
} catch (error) {
  console.error('Error updating account:', error);
  alert('更新失败，请稍后重试');
}
};

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
  top: 15%;

  width: 80%;
  left: 10%;


}

.row {
position: relative;

top: 10%;
left: 0%; 

display: flex;
height: 30%;
width: 100%;
}

.label{
  font-size: 0.4rem;
  font-weight: bold;
  width: 30%;
  height: 10%;
}

.input{
  width: 70%;
  height: 50%;
  font-size: 60%;

  border-radius: 10px;

  border: none;

  background-color: wheat;
}

.send{
  position: relative;
  font-size: 80%;
  color: white;
  font-weight: bold;

  top: 0%;
  left: 30%;

  height: 10%;
  width: 40%;

  border-radius: 10px;

  background-color: #ffa822;

  border: none;
}

.tips{
  position: relative;
  top: 0%;
  left: 10%;

  height: 10%;
  width: 80%;

  font-weight: bold;

  font-size: 50%;
  color: red;
}

.second{
  left: 20%;
  top: 10%;
}
</style>
