<template>
  <div class="header">
      <div class="logo-text"><span>启嘉网</span> </div>
      <div class="user-header">
          <a href="#" class="icon-div1"><span class="iconfont icon1">&#xe607;</span><span class="icon-text1">日志</span></a> 
		   <a href="#" class="icon-div2"><span class="iconfont icon2">&#xe608;</span><span class="icon-text2">消息</span></a>
		    <v-avatar class="tx-icon-img" size="small" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527250116215&di=f8f459d9e5f415b7f74eac761ab7576d&imgtype=0&src=http%3A%2F%2Fpic24.photophoto.cn%2F20120814%2F0005018348123206_b.jpg"></v-avatar>
      </div>
  </div>
</template>

<script>
export default {
  name: "agilityHeader",
  data() {
    return {};
  }
};
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
  width: 1880px;
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
  flex: 0 0 1200px;

  font-family: JPinHei;
  font-size: 26px;
  color: #448df6;
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
  padding-left: 300px;
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
.tx-icon-img{
	margin-left:50px;
}
</style>
