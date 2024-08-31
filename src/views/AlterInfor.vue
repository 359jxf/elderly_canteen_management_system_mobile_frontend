<template>
  <ReturnButton :targetRoute="{ name: 'User' }" />
  <div class="background">
      <div class="headerBox">修改信息</div>
      <div class="registerBox">
          <div class="row"><span class="label">账户名称</span> <input class="inputBox" v-model="accountName"/></div>
          <div class="row"><span class="label">地址</span> <input class="inputBox" v-model="address"/></div>
          <div class="row"><span class="label">性别</span> <input class="inputBox" v-model="gender"/></div>
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

const accountName = ref('');
const address = ref('');
const gender = ref('');
const birthDate = ref('');
const selectedImage = ref(null); // 初始化为null而不是空字符串
const imageUrl = ref('');

const Ensure = async () => {
  const token = localStorage.getItem('token');
  try {
    const formData = new FormData();
    formData.append('accountName', accountName.value);
    formData.append('portrait', selectedImage.value);
    formData.append('gender', gender.value);
    formData.append('birthDate', birthDate.value);
    formData.append('address', address.value);

    const response = await axios.post(
      'http://8.136.125.61/api/Account/alterPersonInfo',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data.alterSuccess) {
      if (accountName.value !== '') {
        localStorage.setItem('accountName', accountName.value);
      }
      
      if (selectedImage.value) {
        const imagePreviewUrl = URL.createObjectURL(selectedImage.value);
        localStorage.setItem('portrait', imagePreviewUrl);
      }

      console.log(accountName.value); // 调试用
      console.log(selectedImage.value); // 调试用
      router.push({ name: 'User' });
    } else {
      alert('更新失败: ' + response.data.msg);
    }
  } catch (error) {
    console.error('Error updating account:', error);
    alert('更新失败，请稍后重试');
  }
};

const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedImage.value = file; // 保存所选的图片文件
    imageUrl.value = URL.createObjectURL(file); // 生成本地 URL 用于预览
  }
};
</script>


<style>
.background{
    position: relative;
    top: 0;

    height: 100vh;
    width: 100vw;

    background-color: wheat ;
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
