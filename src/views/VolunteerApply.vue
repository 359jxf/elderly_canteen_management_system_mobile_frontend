<template>
    <ReturnButton :targetRoute="{ name: 'User' }" />
    <PersonalBackground>
        <div class="header">志愿者申请</div>
        <div class="container">
            <textarea v-model="SELF_STATEMENT" class="description"></textarea>
        </div>
        <button class="send" @click="sendApplication">提交</button>
    </PersonalBackground>
    <BottomTabbar nowView="user" />
</template>

<script setup>
import ReturnButton from '@/components/ReturnButton.vue';
//import { ref } from 'vue';
//import { useRouter } from 'vue-router';
//import axios from 'axios';

//const router = useRouter();
//const SELF_STATEMENT = ref('');

/*
const sendApplication = async () => {
  try {
    const response = await axios.post('YOUR_API_ENDPOINT/password-login', {
      SELF_STATEMENT: SELF_STATEMENT.value,
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
.container{
    position: relative;
    top: 12%;
    left: 10%;
    height: 50%;
    width: 80%;
    background-color: #ffa822;
    border-radius: 20px;
}

.description{
    position: relative;

    height: 90%;
    width: 90%;
    left: 5%;
    top: 5%;
    background-color: #ffa822;

    font-size: 60%;
}

.header{
    position: relative;
    font-weight: bold;
    font-size: 80%;
    text-align: center;
    top: 10%;
}

.send{
    position: relative;
    font-size: 60%;

    top: 15%;
    left: 30%;

    height: 10%;
    width: 40%;
}
</style>
