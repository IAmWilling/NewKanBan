<template>
  <div class="agilityBody">
    <!-- 头部 -->
    <agility-header></agility-header>
    <!-- project -->
    <div style="width:100%;height:100%;display:flex;">
      <project></project>
      <agility-content></agility-content>
    </div>
  
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
          if (res.data.length != 0) {
            
            this.$store.commit("GetDataItemList", res.data);
          }
        });
      window.setTimeout(() => {
        this.GetDataItemList();
      }, 5000);
    }
  },
  created() {
    axios
      .post("/api/session", {
        num: 1
      })
      .then(res => {
        if (res.data == 0) {
          this.$router.push("/login");
        }

        this.$nextTick(() => {
          this.$store.commit("GetDataItemSession", res.data);

          this.GetDataItemList();
        });
      })
      .catch(error => {
        alert("请求错误，请重新尝试!" + error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agilityBody {
  margin: 0 auto;
  width: 100%;
  height: 100%; /*929px*/
  background: #fafafa;
  position: relative;
  top: -8px;
}
</style>
