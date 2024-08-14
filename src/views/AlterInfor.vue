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
//import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();

const imageUrl = ref(null);

const Ensure = () => {
router.push({ name: 'User' });
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
    display: flex;
    position: relative;
    flex-direction: column; /* 使子元素按列布局 */
    align-items: center; /* 子元素水平居中 */
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
    flex-direction: row;
    width: 100%;
    height: 12%;
}

.label{
    width: 20%;
    font-weight: bold;
    font-size: 0.4rem;
    min-width: 25%;
    text-align: left;
}

.inputBox{
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
