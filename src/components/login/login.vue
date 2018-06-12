<template id='boardRoot'>
  <div class='board'>
    <div class="board-left"></div>
    <div class="board-right">
      <p class="board-header">启嘉网看板管理系统</p>
      <div class="inpt-div">
        <span class="input-account" style="color: #666;text-align: center; font-size: 18px; margin-left: 154px;">账号</span>
        <input @keyup.enter="getUserData" v-model="Account" type="text" placeholder="请输入账号" style="margin-left: 32px; font-size: 18px; color: black; border: none; outline: medium;background-color:#fafafa;">
        <hr style="width: 446px; height: 1px; background-color: #ccc; border: 0; margin-left: 155px;">
      </div>
      <div class="inpt-div" style="margin-top: 37px;">
        <span class="input-account" style="color: #666;text-align: center; font-size: 18px; margin-left: 154px;">密码</span>
        <input @keyup.enter="getUserData" v-model="Password" type="password" placeholder="请输入密码" style="margin-left: 32px; font-size: 18px; color: black; border: none; outline: medium;background-color:#fafafa">
        <hr style="width: 446px; height: 1px; background-color: #ccc; border: 0; margin-left: 155px;">
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
      if (this.Account == "" || this.Password == "") {
        this.youth.toast("账号 密码不能为空", true);
        return;
      }
      var element = {
        user: this.Account,
        password: md5(this.Password)
      };
      //axios给后端传输用户输入的账号的密码
      axios
        .post("/api/login?t = " + new Date().getTime(), element) //实时变化的地址，后台不会接收?t=，这样不会受到缓存的干扰
        .then(response => {
          if (response.data.login == 1 || response.data.login == 2) {
            this.$router.push("/"); //路由跳转到首页
            let Array = [response.data, this.Account];
            this.$store.dispatch("changeJurisdiction", Array);
            axios
              .post("/api/load", {
                getData: true
              })
              .then(res => {
            
                this.$store.commit("GetDataItemList", res.data);
              });
          } else {
            this.youth.toast("登录失败");
          }
        })
        .catch(function(error) {
          this.youth.toast("登录 请求失败" + error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.board {
  display: flex;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .board-left {
    width: 50%;
    float: left;
    background-image: url(./图@2.png);
    background-size: cover;
  }
  .board-right {
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
      margin-top: 27.92%;
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
