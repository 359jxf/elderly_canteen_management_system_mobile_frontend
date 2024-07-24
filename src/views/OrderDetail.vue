<template>
    <div id="header">我是傻逼</div>
    <div id="body">
        <div id="address-information-card">
            <div><span style="font-size: 20px; font-weight: 600;">填写收货地址</span></div>
            <div style="display: flex; align-items: center;">
                <div style="width: 80%;"><span style="font-size: 15px;">上海市 嘉定区 曹安公路XXXX</span></div>
                <div style="width: 20%;"><img src="../assets/voice.png" width="50px" height="50px"></div>
            </div>
            <span style="font-size: 10px;">设置为默认地址</span>
        </div>
        <div id="dish-list">
            主播我是人机
            <van-row :gutter="[20, 20]">
                <van-col span="24">
                    <div class="card">
                        <div class="card-left">
                            <img src="../assets/beef.png" height="75px">
                        </div>
                        <div class="card-right">
                            <div class="card-right-top">
                                卤牛肉
                            </div>
                            <div class="card-right-bottom">
                                111
                            </div>
                        </div>
                    </div>
                </van-col>
                <van-col span="24">
                    <div class="card">
                        <div class="card-left">
                            <img src="../assets/beef.png" height="75px">
                        </div>
                        <div class="card-right">
                            <div class="card-right-top">
                                卤牛肉
                            </div>
                            <div class="card-right-bottom">
                                111
                            </div>
                        </div>
                    </div>
                </van-col>
                <van-col span="24">
                    <div class="card">
                        <div class="card-left">
                            <img src="../assets/beef.png" height="75px">
                        </div>
                        <div class="card-right">
                            <div class="card-right-top">
                                卤牛肉
                            </div>
                            <div class="card-right-bottom">
                                111
                            </div>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
    <div id="footer">我是傻逼</div>
</template>

<script setup>
</script>

<style>
#header {
    background-color: red;
}
#body {
    margin-top: 15px;
}
#address-information-card {
    padding-top: 15px;
    padding-left: 20px;
    padding-bottom: 15px;
    border-radius: 15px;
    background-color: blue;
}
#dish-list {
    background-color: white;
    border-radius: 15px;
    padding-top: 15px;
    padding-left: 20px;
    padding-left: 20px;
}
.card {
    height: 75px;
    background-color: pink;
    display: flex;
    border-radius: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-right: 10px;
}
.card-left {
    width: 40%;
    border-radius: 15px;
    padding-left: 10px;
}
.card-right {
    width: 60%;
}
.card-right-top {
    height: 50%;
}
.card-right-bottom {
    height: 50%;
}
#footer {
    background-color: green;
}
</style>