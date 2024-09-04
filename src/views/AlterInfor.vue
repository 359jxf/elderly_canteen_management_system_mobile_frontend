<template>
  <ReturnButton :targetRoute="{ name: 'User' }" />
  <div class="background">
      <div class="headerBox">修改信息</div>
      <div class="registerBox">
          <div class="row"><span class="label">账户名称</span> <input class="inputbox" v-model="accountName"/></div>
          <div class="row"><span class="label">地址</span> <input class="inputbox" v-model="address"/></div>
          <div class="row"><span class="label">性别</span> 
            <select v-model="gender" class="inputbox">
              <option value="">选择性别</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select></div>
          <div class="row"><span class="label">出生日期</span> <input class="inputbox" type="date" v-model="birthDate" :readonly="isNameNotEmpty" /></div>
          <div class="row"><span class="label">选择图片</span> <input class="inputbox no-border" type="file" accept="image/*" @change="onImageSelected"/></div>
          <div v-if="imageUrl"><img :src="imageUrl" alt="Selected Image" class="preview"/></div>
          <button class="getIn" @click="Ensure">确认修改</button>
          <div class="actions">
              <span @click="changePassword">修改密码</span>
              <span @click="rebindPhone">改绑手机</span>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import 'vant/es/toast/style'
import { showToast } from 'vant'

const router = useRouter();

const accountName = ref('');
const address = ref('');
const gender = ref('');
const birthDate = ref('');
const selectedImage = ref(null); // 初始化为null而不是空字符串
const imageUrl = ref('');
const isNameNotEmpty = ref(false);
fetchData();

async function fetchData() {
try {
  // 从 localStorage 中获取保存的 Token
  const token = localStorage.getItem('token');

  // 使用 axios 发起 GET 请求，附带 Authorization 头
  const response = await axios.get('http://8.136.125.61/api/account/getPersonInfo', {
    headers: {
      Authorization: `Bearer ${token}`  // 将 Token 添加到 Authorization 头中
    }
  });

  if (response.data) {
    console.log(response.data.response); // 调试用
    
    accountName.value = response.data.response.accountName;
    address.value = response.data.response.address;
    gender.value = response.data.response.gender;
    birthDate.value = response.data.response.birthDate;

    if(response.data.response.name !== null){
      isNameNotEmpty.value =true;
    }
    
  } else {
    showToast('信息获取失败')
  }
} catch (error) {
  showToast('信息获取失败')
}
};

const Ensure = async () => {
  const token = localStorage.getItem('token');
  try {
    const formData = new FormData();
    formData.append('accountName', accountName.value);
    formData.append('avatar', selectedImage.value);
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
    )

    if (response.data.alterSuccess) {
      if (accountName.value !== '') {
        localStorage.setItem('accountName', accountName.value);
      }

      console.log(selectedImage.value); // 调试用
      localStorage.removeItem('portrait');
      router.push({ name: 'User' });
    } else {
      alert('更新失败: ' + response.data.msg);
    }
  } catch (error) {
    console.error('Error updating account:', error)
    alert('更新失败，请稍后重试')
  }
}

const onImageSelected = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedImage.value = file; // 保存所选的图片文件
    imageUrl.value = URL.createObjectURL(file); // 生成本地 URL 用于预览
  }
};

const changePassword = () => {
router.push({ name: 'ChangePassword' });
};

const rebindPhone = () => {
router.push({ name: 'Rebind' });
};
</script>


<style scoped>
.background{
    position: relative;
    top: 0;

  height: 100vh;
  width: 100vw;

    background-color: wheat ;
}

.registerBox {
  position: relative;
  height: 70%;
  top: 14%;
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
  top: 15%;
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
  width: 100%;
  height: 12%;
}

.label{
    width: 20%;
    font-weight: bold;
    font-size: 60%;
    min-width: 25%;
    align-content: center;
}

.inputbox{
    position: relative;
    width: 50%;
    height: 60%;
    border-radius: 10px ;
    font-size: 60%;
    padding-left: 5px;
    border: 2px solid #000;
    align-self: center;
}

.inputBox{
    position: relative;
    width: 50%;
    height: 60%;
    border-radius: 10px ;
    font-size: 60%;
    padding-left: 5px;
    align-self: center;
}

.no-border {  
  /* 覆盖边框样式为无 */  
  border: none;  
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
}

.getIn{
    position: relative;
    width: 40%;
    height: 10%;
    left: 30%;
    top: 5%;
    border-radius: 20px ;
    font-size: 60%;
    border: none;
      color: white;
      font-weight: bold;
      background-color: #ffa822;
      margin-top: 8%;
}

.preview{
    position: relative;
    height: 12vw;
    width: 12vw;

    top: 5vh;
    left: 40%;

    border-radius:50%;
}

.actions {
  position: absolute;
  top: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.actions span {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
  font-size: 60%;
  margin-left: 10vw; /* 设置左边距 */
  margin-right: 14vw; /* 设置右边距 */
}


</style>