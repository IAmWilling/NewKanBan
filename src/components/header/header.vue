<template>
  <div class="header">
    <div class="logo-text"><span>启嘉网</span> </div>
    <div class="user-header">
      <a href="#" class="icon-div1" @click="routerJournal"><span class="iconfont icon1">&#xe607;</span><span class="icon-text1">日志</span></a>
      <a href="#" class="icon-div2"><span class="iconfont icon2">&#xe608;</span><span class="icon-text2">消息</span></a>
      <v-avatar class="tx-icon-img" size="small" :src="'http://10.2.5.101:3000/'+this.$store.state.img" @click.stop.prevent.native="handleImg"></v-avatar>
    </div>
    <user ref="user_wrapper" id="user_wrapper"></user>
  
  </div>
</template>

<script>
  import axios from 'axios'
  import user from '../user/user'
  export default {
    name: 'agilityHeader',
    components: {
      user
    },
    data() {
      return {
        isShowUser: false
      }
    },
    methods: {
      routerJournal() {
        axios
          .post('/api/load-journal', {
            getInfo: true
          })
          .then(res => {
            this.$store.commit('GetJournalInfo', res.data)
          })
        this.$router.push('/journal')
      },
      handleImg() {
        if (this.$store.state.job == '暂无') {
          axios
            .post('/api/job', {
              getJob: true,
              username: this.$store.state.username
            })
            .then(res => {
              this.$store.dispatch('getJob', res.data)
            })
            .catch(() => {})
        }
        this.$refs.user_wrapper.isShowUser = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../../../static/icon.css";
  a {
    text-decoration: none;
    color: #666666;
  }
  .header {
    background: #ffffff;
  
    height: 86px;
    margin: 0;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    position: relative;
    z-index: 10;
    border: 1px solid #dee2e6;
  }
  .logo-text {
    flex: 0 0 10%;
  
    font-family: JPinHei;
    font-size: 26px;
    color: #03a9f4;
    text-align: justify;
    width: 500px;
    height: 86px;
  }
  .logo-text span {
    display: block;
    padding-top: 30px;
    padding-left: 40px;
    padding-bottom: 30px;
    width: 100px;
  }
  .user-header {
    flex: 1;
    padding-top: 23px;
    padding-right: 40px;
    padding-bottom: 20px;
    padding-left: 4px;
    text-align: right;
  }
  .icon1 {
    font-size: 28px;
    display: inline-block;
  }
  .icon-text1 {
    position: relative;
    top: -5px;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #666666;
    text-align: justify;
  }
  .icon2 {
    font-size: 22px;
  
    display: inline-block;
  }
  .icon-div1 {
    width: 70px;
    text-align: center;
    display: inline-block;
    padding: 12px;
  }
  .icon-div2 {
    width: 70px;
    text-align: center;
    display: inline-block;
    position: relative;
    top: -2px;
  }
  .icon-text2 {
    position: relative;
    top: -4px;
    left: 5px;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #666666;
    text-align: justify;
  }
  .tx-icon-img {
    cursor: pointer;
    margin-left: 50px;
  }
</style>
