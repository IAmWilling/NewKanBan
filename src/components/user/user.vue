<template>
  <div>
    <transition name="fade">
  
      <div class="user-wrapper" id="user_wrapper" v-show="isShowUser">
        <div class="user-header">
          <span class="iconfont icon-1" @click="_handleImg">&#xe603;</span>
        </div>
        <div class="user-img">
          <img width="90" height="90" class="img-item" @click="changeUserImg" :src="'http://10.2.5.101:3000/' + this.$store.state.img">
        </div>
        <div class="user-img-text">
          头像
        </div>
        <div class="user-content">
          <div class="user-username">
            <div id="usertext">用户名</div>
            <div class="username"><span style="font-family: PingFang-SC-Medium;font-size: 16px;color: #333333;text-align: justify;margin-left:15px;">{{this.$store.state.username}}</span></div>
          </div>
          <div class="user-zhiwei">
            <div id="usertext">职位</div>
            <div class="username"><span style="font-family: PingFang-SC-Medium;font-size: 16px;color: #333333;text-align: justify;margin-left:15px;">{{this.$store.state.job}}</span></div>
          </div>
        </div>
        <input type="file" style="display:none;" id="fileUser" @change="changeUserImgAuto($event)" accept=".jpeg ,.jpg ,.png ,.gif">
        <a href="#" class="user-exit" @click="exitUser">退出登录</a>
      </div>
    </transition>
      <v-modal name="exitUser" :canclose="false">
      <div class="Modal_div">
        <div class="title_modal_div">
          <div class="text-title">提示</div>
          <div class="icon-title">
            <a href="#" class="iconfont" @click="closeExitUser" style="font-size:12px;color:#888888;;">&#xe603;</a>
          </div>
        </div>
        <p class="modal_content_1">
          确定要退出吗？
        </p>
        <div class="btn_modal_1">
          <a href="#" class="btn_sure_1" @click="exitUser_sure">确定</a>
          <a href="#" class="btn_quxiao_1" @click="closeExitUser">取消</a>
        </div>
      </div>
    </v-modal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    this.$nextTick(() => {
      document.addEventListener("click", e => {
        e = e || window.event;
        let elem = e.target || e.srcElement;
        while (elem) {
          if (elem.id && elem.id == "user_wrapper") {
            return;
          }
          elem = elem.parentNode;
        }
        this.isShowUser = false;
      });
    });
  },
  data() {
    return {
      isShowUser: false
    };
  },
  methods: {
    //退出登录
    exitUser() {
      this.youth.open("exitUser");
    },
    closeExitUser() {
      this.youth.close("exitUser");
    },
    _handleImg() {
      this.isShowUser = false;
    },
    changeUserImg() {
      document.getElementById("fileUser").click();
    },
    changeUserImgAuto(el) {
      let username = this.$store.state.username;
      let _this = this;
      let files = el.target.files[0];
      if (!el || !window.FileReader) return;
      let reader = new FileReader();
      reader.readAsDataURL(files);

      reader.onloadend = function() {
        _this.imgsrc = this.result; //Betas64数据

        if (this.imgsrc != "") {
          axios
            .post("/api/head", {
              imgSrc: _this.imgsrc,
              username: username
            })
            .then(res => {
              _this.$store.dispatch("changeUserImg", res.data);
              _this.youth.toast("头像保存成功！");
            })
            .catch(error => {
              _this.youth.toast("头像失败成功！" + error, true);
            });


            
        }
      };
      reader.onload = function(event) {};
    },
    exitUser_sure() {
      axios.post("/api/del-session", { exit: true }).then(res => {
        
      });
      this.$router.go("/login")
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../static/icon.css";
.user-wrapper {
  position: absolute;
  background: #ffffff;
  box-shadow: 0 28px 40px 0 rgba(0, 0, 0, 0.42);
  width: 272px;
  height: 466px;
  top: 100px;
  right: 40px;
  .user-header {
    padding-top: 26px;
    text-align: right;
    .icon-1 {
      cursor: pointer;
      margin-right: 26px;
      font-size: 14px;
      color: #888888;
    }
  }
  .user-img {
    margin-top: 10px;
    height: 90px;
    width: 100%;
    text-align: center;
    .img-item {
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .user-img-text {
    margin-top: 10px;
    text-align: center;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #666666;
  }
  .user-content {
    height: 90px;
    margin-top: 48px;
    padding: 0 23px;
    .user-username {
      height: 35px;
      .username {
        display: inline-block;
        background: #f7f7f7;
        border-radius: 4px;
        width: 164px;
        height: 34px;
        line-height: 35px;
      }
      #usertext {
        display: inline-block;
        margin-right: 5px;
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #888888;
        vertical-align: top;
        line-height: 35px;
        width: 48px;
      }
    }
    .user-zhiwei {
      height: 35px;
      margin-top: 13px;
      .username {
        display: inline-block;
        background: #f7f7f7;
        border-radius: 4px;
        width: 164px;
        height: 34px;
        line-height: 35px;
      }
      #usertext {
        display: inline-block;
        margin-right: 5px;
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        color: #888888;
        vertical-align: top;
        line-height: 35px;
        width: 48px;
      }
    }
  }
  .user-exit {
    display: block;
    position: absolute;
    top: 414px;
    right: 26px;
    height: 22px;
    width: 64px;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #666666;
    text-align: justify;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.Modal_div {
  width: 427px;
  height: 260px;
  background: #ffffff;
  box-shadow: 0 27px 50px 0 rgba(0, 0, 0, 0.4);
}
.text-title {
  display: inline-block;
  padding: 15px;
  width: 300px;
  font-family: PingFang-SC-Medium;
  font-size: 18px;
  color: #333333;
  letter-spacing: 0;
  text-align: justify;
}
.title_modal_div {
  height: 51px;
  border-bottom: 1px solid #e9ecee;
}
.icon-title {
  display: inline-block;
  width: 60px;
  padding: 15px;
  text-align: right;
}
.modal_content_1 {
  padding: 18px;
  font-family: PingFang-SC-Medium;
  font-size: 20px;
  color: #222222;
  letter-spacing: 0;
  text-align: justify;
  text-align: center;
}
.btn_modal_1 {
  padding: 25px;
  height: 38px;
  width: 250px;
  margin: 0 auto;
}
.btn_sure_1 {
  width: 98px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  display: inline-block;
  background: #448df6;
  border-radius: 2px;
  color: #fff;
}
.btn_quxiao_1 {
  width: 98px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  display: inline-block;
  margin-left: 40px;
  border-radius: 2px;
  color: #888888;
  border: 1px solid #cccccc;
}
.btn_sure_1:hover {
  opacity: 0.86;
}
.btn_quxiao_1:hover {
  opacity: 0.86;
}
</style>
