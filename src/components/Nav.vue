<template>
  <div class="top">
    <van-icon name="arrow-left" @click="onClickLeft" />
    <p>{{ props.nav_text }}</p>
    <img :src="portrait" @click="clickPortrait" />
  </div>
</template>
<script setup>
import { getPorTrait } from '../api/api'
const onClickLeft = () => history.back() //顶部返回键逻辑
const props = defineProps({
  nav_text: String
})

//头像加载（渲染阶段）、点击跳转用户页
//#region
const portrait = ref();
const loadPortrait = async () => {
  const url = await getPorTrait()
  console.log('component:getportrait:url:', url)
  portrait.value = url
  console.log('portrait:', portrait)
}
onMounted(loadPortrait)

const router = useRouter()
const clickPortrait = () => {
  router.push({ path: '/User' })
}
//#endregion
</script>

<style scoped>
.top p {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-weight: bold;
}

.top img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin-right: 10px;
}

.top .van-icon {
  margin-left: 10px;
}

.top {
  height: 5vh;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  font-size: large;
  font-weight: bold;
  /* position: relative; */
}
</style>
