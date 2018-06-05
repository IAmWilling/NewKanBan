<template>
  <div class="agilityBody">
    <!-- 头部 -->
    <agility-header></agility-header>
    <!-- project -->
    <project></project>
    <agility-content></agility-content>
  </div>
</template>

<script>
import agilityHeader from "./header/header";
import project from "./project/project";
import agilityContent from "./content/content";
import axios from "axios";
import routes from "../router/index.js";
export default {
  name: "HelloWorld",
  components: {
    agilityHeader,
    project,
    agilityContent
  },
  data() {
    return {};
  },
  methods: {
    GetDataItemList() {
      axios
        .post("/api/load", {
          getData: true
        })
        .then(res => {
          console.log(res.data);
          this.$store.commit("GetDataItemList", res.data);
        });
         window.setTimeout(()=>{
      this.GetDataItemList();
    },5000)
    }
  },
  created() {
    // 判断是否登录 判断
    
    if (this.$store.state.login == 0) {
      alert("您还没有登录请登录");
      routes.push("/");
      return;
    }
   this.GetDataItemList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agilityBody {
  margin: 0 auto;
  width: 1880px;
  height: 929px;
  background: #fafafa;
  position: relative;
  top: -8px;
}
</style>
