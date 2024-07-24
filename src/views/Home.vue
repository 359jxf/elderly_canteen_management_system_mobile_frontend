<script setup></script>

<template>
  <van-row>
    <van-col span="3" class="search-line-icon"><van-icon name="arrow-left" /></van-col>
    <van-col span="18"
      ><van-search v-model="value" placeholder="请输入搜索关键词"></van-search
    ></van-col>
    <van-col span="3" class="search-line-icon">
      <div class="search-line-icon">
        <img src="../assets/oldman.jpg" height="40" width="40" />
      </div>
    </van-col>
  </van-row>
  <div>
    <img src="../assets/slogan.jpg" id="slogan" />
  </div>
  <div id="mid">
    <span id="menu">今日菜单</span>
    <van-row gutter="0" style="margin: 2%">
      <van-col span="6" class="menu-line">
        <van-button class="menu-button"> 主食 </van-button>
      </van-col>
      <van-col span="6" class="menu-line">
        <van-button class="menu-button"> 炒菜 </van-button>
      </van-col>
      <van-col span="6" class="menu-line">
        <van-button class="menu-button"> 凉菜 </van-button>
      </van-col>
      <van-col span="6" class="menu-line">
        <van-button class="menu-button"> 粥品 </van-button>
      </van-col>
    </van-row>
  </div>
  <div id="item-list">
    <div class="item">
      <van-card
        num="1"
        price="2.00"
        title="好吃的东西"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      >
        <template #footer>
          <van-button size="small" color="#FFA500" style="border-radius: 50%"
            ><span color="black">+</span></van-button
          >
        </template>
      </van-card>
    </div>
    <div class="item">
      <van-card
        num="1"
        price="2.00"
        title="好吃的东西"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      >
        <template #footer>
          <van-button size="small" color="#FFA500" style="border-radius: 50%"
            ><span color="black">+</span></van-button
          >
        </template>
      </van-card>
    </div>
    <div class="item">
      <van-card
        num="1"
        price="2.00"
        title="好吃的东西"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      >
        <template #footer>
          <van-button size="small" color="#FFA500" style="border-radius: 50%"
            ><span color="black">+</span></van-button
          >
        </template>
      </van-card>
    </div>
    <div class="item">
      <van-card
        num="1"
        price="2.00"
        title="好吃的东西"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      >
        <template #footer>
          <van-button size="small" color="#FFA500" style="border-radius: 50%"
            ><span color="black">+</span></van-button
          >
        </template>
      </van-card>
    </div>
    <div class="item">
      <van-card
        num="1"
        price="2.00"
        title="好吃的东西"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      >
        <template #footer>
          <van-button size="small" color="#FFA500" style="border-radius: 50%"
            ><span color="black">+</span></van-button
          >
        </template>
      </van-card>
    </div>
    <div class="item">
      <van-card
        num="1"
        price="2.00"
        title="好吃的东西"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      >
        <template #footer>
          <van-button size="small" color="#FFA500" style="border-radius: 50%"
            ><span color="black">+</span></van-button
          >
        </template>
      </van-card>
    </div>
    <div class="item">
      <van-card
        num="1"
        price="2.00"
        title="好吃的东西"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      >
        <template #footer>
          <van-button size="small" color="#FFA500" style="border-radius: 50%"
            ><span color="black">+</span></van-button
          >
        </template>
      </van-card>
    </div>
    <div class="item">
      <van-card
        num="1"
        price="2.00"
        title="好吃的东西"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
      >
        <template #footer>
          <van-button size="small" color="#FFA500" style="border-radius: 50%"
            ><span color="black">+</span></van-button
          >
        </template>
      </van-card>
    </div>
  </div>
  <router-link to="/login"></router-link>
  <router-link to="/OrderDetail"></router-link>
  <router-link to="/ShoppingCart"></router-link>
  <div>
    <van-action-bar>
      <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-action-bar-button type="danger" text="立即支付" @click="onClickButton" />
    </van-action-bar>
  </div>
</template>

<style scoped>
#search-line {
  width: 80%;
  display: flex;
  align-items: center;
}
.search-line-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
#slogan {
  width: 100%;
}
#mid {
  margin: 3%;
}
#menu {
  font-size: 20px;
  font-weight: 1000;
  margin: 2%;
}
.menu-button {
  color: #ffa500;
  border-color: #ffa500;
  height: 35px;
  width: 70px;
}

.menu-line {
  display: flex;
  align-items: center;
}
#item-list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 46%;
  margin: 2%;
}
</style>
