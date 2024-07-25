<template>
  <div class="dishcard">
    <div class="card-left">
      <img src="../assets/beef.png" height="75px" />
    </div>
    <div class="card-right">
      <div class="card-right-top">
        <span class="text">卤牛肉</span>
      </div>
      <div class="card-right-bottom">
        <div class="card-right-bottom-left">
          <span class="text">￥14.50</span>
        </div>
        <div class="card-right-bottom-right">
          <img src="../assets/plus.png" />
          <span class="num">&nbsp;1&nbsp;</span>
          <img src="../assets/plus.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.dishcard {
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  margin-top: 4%;
  border-radius: 15px;
  padding: 4%;
  display: flex;
}
.card-left {
  width: 40%;
}
.card-right {
  width: 60%;
}
.card-right-top {
  height: 50%;
  display: flex;
  align-items: center;
}
.card-right-top .text {
  font-size: 20px;
  font-weight: bold;
}
.card-right-bottom {
  height: 50%;
  display: flex;
  align-items: center;
}
.card-right-bottom-left {
  width: 70%;
}
.card-right-bottom-right {
  width: 30%;
  display: flex;
  justify-items: center;
  align-items: center;
}
.num {
  font-size: small;
}
.card-right-bottom .text {
  font-size: medium;
  font-weight: bold;
}
.card-right-bottom .num {
  font-size: small;
}
</style>
