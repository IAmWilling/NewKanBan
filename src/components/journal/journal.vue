<template>
  <div class="journal-div">
      <div class="header">
          <div class="logo-text"><span @click="routerIndex">启嘉网</span> </div>
      </div>
    <div class="left-div">
        <router-link to="/journal/all" tag="div" class="left-div-list">最近的日志</router-link>
      
    </div>
    <div class="right-div">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "journal",
  methods: {
    routerIndex() {
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.router-link-active {
  transition-duration: 0.2s;
  background: #ffffff;
  box-shadow: 0 2px 6px 0 #ebf1f6;
  font-size: 28px;
  font-weight:bold;
  color:#448DF6;
 
}
.journal-div {
  margin: 0 auto;
  width: 100%;
  
  height: 929px;
  position: relative;
  background-color: #fafafa;
  display: inline-block;
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
  z-index:10;
  border: 1px solid #DEE2E6;
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
  cursor: pointer;
}
.left-div {
  height: 750px;
  width: 225px;
  
  padding-top: 50px;
  display: inline-block;
}
.left-div-list {
  text-decoration: none;

  width: 225px;
  height: 56px;
  
  font-family: PingFangSC-Regular;
  font-size: 18px;
 
  text-align: center;
  line-height: 56px;
  cursor: pointer;
  display: block;
}
.right-div {
  position: absolute;
  width: 1650px;
  height: 843px;
  
  top: 86px;
  left: 225px;
}
</style>
