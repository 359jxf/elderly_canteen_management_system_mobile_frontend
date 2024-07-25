<script setup></script>

<template>
  <div>
    <SearchLine />
  </div>
  <div>
    <img src="../assets/slogan.jpg" class="slogan" />
  </div>
  <div class="mid">
    <span class="menu">今日菜单</span>
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
  <div class="item-list">
    <DishItem />
    <DishItem />
    <DishItem />
    <DishItem />
    <DishItem />
  </div>
  <div>
    <router-link to="/login"></router-link>
    <router-link to="/OrderDetail"></router-link>
    <router-link to="/ShoppingCart"></router-link>
  </div>
  <div>
    <van-action-bar>
      <div class="cart">
        <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      </div>
      <div class="text">
        <span>查看购物车</span>
      </div>
      <div class="num">
        <span>￥25.18</span>
      </div>
    </van-action-bar>
  </div>
</template>

<style scoped>
.search-line-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.slogan {
  width: 100%;
}
.mid {
  margin: 3%;
}
.menu {
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
.item-list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 46%;
  margin: 2%;
}
.cart {
  margin-right: 5%;
  margin-left: 5%;
}
.text {
  font-size: medium;
  font-weight: bold;
  margin-right: 30%;
}
.num {
  font-size: large;
  font-weight: bold;
}
</style>
