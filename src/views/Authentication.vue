<template>
    <ReturnButton :targetRoute="{ name: 'User' }" />
    <PersonalBackground>
        <div class="header">实名认证</div>
        <div class="inputBox">
            <div class="row"><span class="label">真实姓名</span><input class="input" v-model="name"></div>
            <div class="row"><span class="label">身份证号</span><input class="input" v-model="IDCard"></div>
        </div>
        <button class="send" @click="sendApplication">提交</button>
    </PersonalBackground>
    <BottomTabbar nowView="user" />
</template>

<script setup>
//import { ref } from 'vue';
//import { useRouter } from 'vue-router';
//import axios from 'axios';

//const router = useRouter();
//const name = ref('');
//const IDcard = ref('');

/*
const sendApplication = async () => {
  try {
    const response = await axios.post('YOUR_API_ENDPOINT/password-login', {
      name: name.value,
      IDCard: IDCard.value,
    });
    if (response.data.success) {
      const { token, identity, accountName } = response.data.response;
      console.log('Login successful:', { token, identity, accountName });
      router.push({ name: 'User' });
    } else {
      alert(response.data.msg);
    }
  } catch (error) {
    console.error('Error logging in with password:', error);
    alert('An error occurred during login.');
  }
};
*/

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
    top: 20%;

    width: 80%;
    left: 10%;
}

.row {
  display: flex;
  flex-direction: row;
  height: 40%;
}

.label{
    font-size: 60%;
    font-weight: bold;
    width: 30%;
}

.input{
    width: 70%;
    height: 50%;
    font-size: 60%;
    border-radius: 10px;
}

.send{
    position: relative;
    font-size: 60%;

    top: 15%;
    left: 30%;

    height: 10%;
    width: 40%;

    border-radius: 10px;
}
</style>
