<template id='boardRoot'>
  <div class='board'>
    <div class="board-left"><img class="board-image" src="./图@2.png"></div>
    <div class="board-right">
      <p class="board-header">启嘉网看板管理系统</p>
      <div class="inpt-div">
        <span class="input-account" style="color: #666;text-align: center; font-size: 18px; margin-left: 154px;">账号</span>
        <input @keyup.enter="getUserData" v-model="Account" type="text" placeholder="请输入账号" style="margin-left: 32px; font-size: 18px; conor: #ccc; border: none; outline: medium;">
        <hr style="width: 446px; height: 1px; background-color: #ccc;">
      </div>
      <div class="inpt-div" style="margin-top: 37px;">
        <span class="input-account" style="color: #666;text-align: center; font-size: 18px; margin-left: 154px;">密码</span>
        <input @keyup.enter="getUserData" v-model="Password" type="password" placeholder="请输入密码" style="margin-left: 32px; font-size: 18px; conor: #ccc; border: none; outline: medium;">
        <hr style="width: 446px; height: 1px; background-color: #ccc;">
      </div>
      <v-button @click="getUserData" type="primary" style="font-size: 20px; line-height: 45px; background-color: #448DF6;" class="login-button">登陆</v-button>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import axios from "axios";

export default {
  name: "login",
  data: function() {
    return {
      Account: "", //获取用户的账号密码，双向绑定
      Password: ""
    };
  },
  methods: {
    getUserData: function() {
      var element = {
        user: this.Account,
        password: md5(this.Password)
      };
      //axios给后端传输用户输入的账号的密码
      axios
        .post("/api/login?t = " + new Date().getTime(), element) //实时变化的地址，后台不会接收?t=，这样不会受到缓存的干扰
        .then(response => {
          console.log(response);
          // console.log('请求成功' + eval(response));
          if (response.data.login == 1 || response.data.login == 2) {
            this.$router.push("/index"); //路由跳转到首页
            let Array = [response.data, this.Account];
            this.$store.dispatch("changeJurisdiction", Array);
            axios
              .post("/api/load", {
                getData: true
              })
              .then(res => {
                console.log(res.data);
                this.$store.commit("GetDataItemList", res.data);
              });
          } else {
            console.log("登录失败");
          }
        })
        .catch(function(error) {
          console.log("请求失败" + error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.board {
  width: 1442px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .board-left {
    width: 686px;
    height: 1024px;
    float: left;
    .board-image {
      width: 100%;
      height: 100%;
    }
  }
  .board-right {
    width: 754px;
    height: 1024px;
    margin-right: 0;
    float: right;
    .board-header {
      width: 340px;
      height: 50px;
      font-size: 36px;
      color: #222222;
      letter-spacing: 1px;
      text-align: center;
      margin-left: 211px;
      margin-top: 272px;
      margin-bottom: 106px;
      font-weight: bold;
    }
    .login-button {
      width: 398px;
      height: 47px;
      text-align: center;
      margin-left: 153px;
      margin-top: 155px;
    }
  }
}
</style>
