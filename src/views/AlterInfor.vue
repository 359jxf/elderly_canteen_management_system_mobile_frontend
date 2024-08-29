<template>
    <ReturnButton :targetRoute="{ name: 'User' }" />
    <div class="background">
        <div class="headerBox">修改信息</div>
        <div class="registerBox">
            <div class="row"><span class="label">账户名称</span> <input class="inputBox" v-model="accountName"/></div>
            <div class="row"><span class="label">地址</span> <input class="inputBox" v-model="address"/></div>
            <div class="row"><span class="label">出生日期</span> <input class="inputBox" type="date" v-model="birthDate"/></div>
            <div class="row"><span class="label">选择图片</span> <input class="inputBox" type="file" accept="image/*" @change="onImageSelected"/></div>
            <div v-if="imageUrl"><img :src="imageUrl" alt="Selected Image" class="preview"/></div>
            <button class="getIn" @click="Ensure">确认修改</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = localStorage.getItem('token');

const accountName = ref(null);
const address = ref(null);
const birthDate = ref(null);
const imageUrl = ref(null);

const Ensure = async () => {
  try {
    const response = await axios.post('http://8.136.125.61/api/Account/alterPersonInfo', {
      headers: {
        Authorization: `Bearer ${token}`
      },
        accountName: '11',
        phoneNum:'111',
        portrait: '111',
        gender:'female',
        birthDate: birthDate.value,
        address: 'address',
        name:'平泽唯'
    });

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

const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
};

</script>
<style>
.background{
    position: relative;
    top: 0;

    height: 100vh;
    width: 100vw;

    background-color: #ffa822 ;
}

.registerBox{
    position: relative;
    height: 70%;
    top:14%;
    width: 80%;
    left: 10%;
    background-color: white;
    border-radius: 20px ;

    z-index: 1;
    box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

.headerBox{
    position: relative;
    height: 5%;
    top: 15%;
    width: 60%;
    left: 20%;
    background-color: white;

    font-weight: bold;
    font-size: 80%;
    text-align: center;
    border-radius: 10px ;

    z-index: 3;
    box-shadow: 0 -7px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

.row {
    top: 10%;
    left: 10%;
    position: relative;
    display: flex;
    width: 100%;
    height: 12%;
}

.label{
    width: 20%;
    font-weight: bold;
    font-size: 70%;
    min-width: 25%;
}

.inputBox{
    position: relative;
    width: 50%;
    height: 60%;
    border-radius: 10px ;
    font-size: 60%;
}

.half{
    width: 25%;
    height: 50%;
}

.verifyBtn{
    position: relative;
    width: 20%;
    height: 50%;
    left: 5%;
    border-radius: 5px ;
}

.getIn{
    position: relative;
    width: 40%;
    height: 10%;
    left: 30%;
    top: 10%;
    border-radius: 20px ;
    font-size: 60%;
}

.preview{
    position: relative;
    height: 10%;
    width: 20%;
}
</style>
