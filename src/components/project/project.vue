<template>
    <div class="project-div">
        <!-- 项目 管理 增加 -->
        <div class="name-project">
            <div class="title-project">项目</div>
            <!--图标  -->
            <div class="gl-icons">
                <!-- <a href="#" class="iconfont" style="color: #888888;margin-left:20px;">&#xe609;</a> -->
                <a href="#" @click="showManage" class="iconfont" style="color: #666666;margin-left:10px;">&#xe605;</a>
            </div>
        </div>
        <!-- project列表 -->
        <!-- 动态路由当前页面  在content中有route-rview试图 请记住-->
        <div class="project-list" ref="project_list">
            <router-link tag="div" v-for="item in this.$store.state.projectList" :key="item.projectId" :to="'/HelloWorld/'+item.projectId" class="project-list-item" @click.native="viewProject(item.name)">
                <div class="project-text omit">{{item.name}}</div>
                <div class="project-item-count">{{item.len}}</div>
            </router-link>
        </div>
        <v-button type="primary" style="width:150px;margin-left:25px;text-align:center;height:25px;line-height:25px;margin-top: 20px;"
        @click="openMaskLayer">新建项目</v-button>
        
        <!-- <v-input class="project-input" placeholder="新项目" v-model="projectName" @keyup.enter.native="newProject "></v-input> -->
       
      <manage></manage>

      <v-modal name="maskLayer_project" :canclose="false">
      <div class="addClassify">
        <div class="title-classify">
          <!-- 标题 -->
          <div class="title-text">
            <div class="iconfont icon-1">&#xe609;</div>
            <div class="title-content">新建项目</div>
            <div class="iconfont icon-2" @click="closeModal">&#xe603;</div>
          </div>
        </div>
        <div class="input-content">
          <input v-model="projectName" type="text" placeholder="项目名称" class="input-content-text" @focus="focus" @blur="blur">
        </div>
        <div class="border-color" ref="border_colors"></div>
        <a href="#" class="quxiao" @click="closeModal">取消</a>
        <a href="#" class="baocun" @click="newProject">保存</a>
      </div>
    </v-modal>
    </div>
</template>
<script>
import axios from "axios";

import manage from "../common/manage"; // 管理窗口
export default {
  name: "project",
  components: {
    manage
  },
  data() {
    return {
      projectName: "",
      classifyLength: 0 //表示左边的数字 也就是对应的列表中的分类总数
    };
  },
  methods: {
    //打开新建项目窗口
    openMaskLayer(){
      if (this.$store.state.jurisdiction != 1) {
         this.youth.toast("您不是管理员无法操作...",true);
         return;
       }
      this.youth.open("maskLayer_project");
    },
     focus() {
      this.$refs.border_colors.classList.add("border_color");
    },
      blur() {
      this.$refs.border_colors.classList.remove("border_color");
    },
    closeModal(){
       this.youth.close("maskLayer_project");
    },
    newProject() {
      //判断管理员权限
       
      if (this.$refs.project_list.offsetHeight >= 300) {
       
        this.$refs.project_list.style.overflowX = "hidden";
        this.$refs.project_list.style.overflowY = "auto";
      }
      this.projectName = this.projectName.replace(/(^\s*)|(\s*$)/g, "");
      if (this.projectName.length != 0) {
        for (let i = 0; i < this.$store.state.itemizedList.length; i++) {
          if (this.$store.state.itemizedList[i].cont == this.projectName) {
            //找到与点击项目名称相应的对象数组发送到vuex中进行处理
            this.classifyLength = this.$store.state.itemizedList[i].ar.length;
          }
        }
        let project = {
          name: this.projectName,
          projectId: Math.floor(Math.random() * 999999),
          len: this.classifyLength
        };
        for (let i = 0; i < this.$store.state.itemizedList.length; i++) {
          if (this.$store.state.itemizedList[i].cont == this.projectName) {
            this.youth.toast("检测到名称有重复现象!", true);
            return;
          }
        }
        axios
          .post("/api/ins-project", {
            name: this.projectName,
            projectId: Math.floor(Math.random() * 999999),
            len: this.classifyLength
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
        this.$store.dispatch("addProject", project);
      }
      this.projectName = "";
          this.youth.close("maskLayer_project");
    },
    //这是点击查看某看板内容 传入名称
    viewProject(name) {
      //这传入当前选中的项目 为后面做好铺垫
      this.$store.dispatch("CurrentSelection", name);
      for (let i = 0; i < this.$store.state.itemizedList.length; i++) {
        if (this.$store.state.itemizedList[i].cont == name) {
          //找到与点击项目名称相应的对象数组发送到vuex中进行处理
          this.$store.dispatch(
            "PassInTheCorrespondingProject",
            this.$store.state.itemizedList[i].ar
          );
        }
      }
    },
    //打开管理窗口
    showManage() {
      this.youth.open("modal1");
    },
    created(){
       if (this.$refs.project_list.offsetHeight >= 300) {
       
        this.$refs.project_list.style.overflowX = "hidden";
        this.$refs.project_list.style.overflowY = "auto";
      }
    }
  }
};
</script>
<style scoped>
@import "../../../static/icon.css";
.router-link-active {
  transition-duration: 0.2s;
  background: #ffffff;
  box-shadow: 0 2px 6px 0 #ebf1f6;
  font-size: 18px;
  color: #448df6;
  text-align: justify;
}
.project-div {
  background: #ffffff;
  box-shadow: 2px 0 5px 0 #f1f2f4;
  width: 250px;
  height: 859px;
  flex:0 0 250px;
  /* position: absolute;
  top: 0px; */
  float: left;
}
.name-project {
      margin-top: 60px;
  height: 30px;
  padding: 20px 20px 30px 40px;
  display: flex;
}
.title-project {
  flex: 0 0 110px;
  font-family: PingFang-SC-Medium;
  font-size: 20px;
  color: #222222;
  text-align: justify;
}
.gl-icons {
  flex: 1;
  height: 30px;
  line-height: 30px;
  text-align: right;
}
.project-list {
  /* height: 700px;
  overflow-x: hidden;
  overflow-y: auto; */
  font-size: 14px;
  max-height: 400px;
 
}
.project-list::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.project-list::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px #03a9f4;
  background: #03a9f4;
}
.project-list::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.project-list-item {
  height: 53px;
  width: 250px;
  display: flex;
  cursor: pointer;
}
.project-list-item:hover {
  background-color: #f1f2f4;
}
.project-text {
  flex: 0 0 160px;
  padding-left: 40px;
  padding-top: 15px;
  padding-bottom: 10px;
  display: inline-block;
  width: 160px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
}
.project-item-count {
  display: inline-block;
  background-color: #ffc629;
  color: #fff;
  width: 18px;
  height: 17px;
  border-radius: 50%;
  font-size: 14px;
  text-align: center;
  margin: 0 auto;
  margin-top: 20px;
  line-height: 17px;
}
.project-input {
  border: 1px solid #448df6;
  border-radius: 2px;
  width: 182px;
  height: 44px;
  margin-left: 30px;
  margin-top: 20px;
}
.addClassify {
  height: 200px;
  width: 629px;
}
.title-classify {
  height: 75px;
  border-bottom: solid 1px #e9ecee;
}
.v-modal {
  border-radius: 0px;
}
.title-text {
  padding: 20px 20px 20px 20px;
  height: 45px;
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #333333;
  text-align: justify;
  line-height: 45px;
}
.icon-1 {
  display: inline-block;
  font-size: 23px;
  color: #333333;
  font-weight: bold;
}
.icon-2 {
  display: inline-block;
  position: relative;
  left: 430px;
  top: -5px;
  margin-right: 20px;
  color: #888888;
  font-size: 13px;
  cursor: pointer;
}
.title-content {
  display: inline-block;
  font-weight: bold;
}
.input-content-text {
  border: none;
  height: 30px;
  font-size: 17px;
  width: 500px;
  outline: none;
  text-align: center;
  margin: 0 auto;
  display: block;
  margin-top: 10px;
}
.border-color {
  margin: 0 auto;
  margin-top: 5px;
  height: 1px;
  border-radius: 0.5px;
  width: 0px;
  transition-duration: 0.3s;
  background-color: #448df6;
}
.border_color {
  width: 500px;
}
.quxiao {
  display: inline-block;
  width: 98px;
  height: 38px;
  margin-top: 20px;
  margin-right: 10px;
  margin-left: 400px;
  color: #888888;
  border: 1px solid #cccccc;
  border-radius: 2px;
  text-align: center;
  line-height: 38px;
}
.baocun {
  margin-top: 20px;
  display: inline-block;
  width: 98px;
  height: 38px;
  background: #448df6;
  border-radius: 2px;
  color: #fff;
  text-align: center;
  line-height: 38px;
}
.border_color {
  width: 500px;
}

</style>
