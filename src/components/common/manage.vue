<template>
  <div>
    <v-modal name="modal1" :canclose="false">
      <div class="v-modal1">
        <div class="header">
          <div style="width: 629px; height: 20px;"></div>
          <span class="iconfont setting" style="font-size: 24px; margin-left: 45px;">&#xe605;</span>
          <span class="word-manage">管理项目</span>
          <span class="iconfont back" @click="clickBack">&#xe603;</span>
        </div>
        <div class="dividing"></div>
        <div class="bottom-left">
          <div style="height: 20px; width: 166px;"></div>
          <div class="all-project">全部项目</div>
        </div>
        <div class="bottom-right">
          <div style="height: 20px; width: 463px;"></div>
          <div class="vfor-projects" style="width: 463px; height: 451px;">
            <div class="projects" v-for="(project,index) in this.$store.state.projectList" :key="index">
              <div class="project-data">{{project.name}}</div>
              <span class="iconfont delete-project" @click="deleteProject(project.name)">&#xe604;</span>
              <hr style="position: relative; top: -65px; width: 409px; margin-left: 0; border: none; height: 1px; background-color: #EFF1F3;">
            </div>
          </div>
        </div>
      </div>
    </v-modal>



    
    <v-modal name="modal2" :canclose="false">
  		<div class="Modal_div">
  			<div class="title_modal_div">
  				<div class="text-title">提示</div>
  				<div class="icon-title">
  					<a href="#" class="iconfont" @click="handleNoClick" style="font-size:12px;color:#888888;;">&#xe603;</a>
  				</div>
  			</div>
  			<p class="modal_content_1">
  				删除后不能恢复，确定要删除吗?
  			</p>
  			<div class="btn_modal_1">
  				<a href="#" class="btn_sure_1" @click="sureYesClick">确定</a>
  				<a href="#" class="btn_quxiao_1" @click="handleNoClick">取消</a>
  			</div>
  		</div>
  	</v-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "manage",
  data: function() {
    return {
      projectName: ""
    };
  },
  methods: {
    deleteProject: function(name) {
      if (this.$store.state.jurisdiction == 1) {
        this.projectName = name;
        this.youth.open("modal2");
      }else{
        this.youth.toast("您不是管理员无权操作...",true)
      }
    },
    clickBack: function() {
      this.youth.close("modal1");
    },
    handleNoClick() {
      this.youth.close("modal2");
    },
    sureYesClick() {
      //删除所愿project项目列表所有的内容
      axios
        .post("/api/del-project", {
          projectName: this.projectName
        })
        .then(res => {
          
        })
        .catch(error => {
          console.log(error);
        });
      this.$store.commit("deleteProject", this.projectName);
      this.youth.toast(`删除 ${this.projectName} 项目成功！`)
      this.youth.close("modal2");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../static/icon.css";

.v-modal1 {
  width: 629px;
  height: 546px;
  .header {
    .setting {
      position: relative;
      top: 2px;
    }
    .word-manage {
      width: 96px;
      height: 33px;
      font-size: 24px;
      color: #333333;
      text-align: justify;
      margin-left: 14px;
    }
    .back {
      cursor: pointer;
      color: #888;
      margin-left: 395px;
    }
  }
  .dividing {
    border: 1px;
    width: 628px;
    height: 1px;
    background: #e9ecee;
    margin-top: 18px;
  }
  .bottom-left {
    float: left;
    width: 166px;
    height: 471px;
    background-color: #fafafa;
    .all-project {
      background-color: #fff;
      line-height: 3;
      height: 55px;
      width: 166px;
      font-size: 18px;
      color: #448df6;
      text-align: center;
    }
  }
  .bottom-right {
    float: right;
    width: 463px;
    height: 468px;
    .projects {
      height: 53px;
      width: 463px;
      line-height: 3.5;
      margin-left: 52px;
      .delete-project {
        // float: right;
        cursor: pointer;
        position: relative;
        top: -55px;
        left: 350px;
      }
    }
  }
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

  border-radius: 2px;
  color: #888888;
  border: 1px solid #cccccc;
  float: right;
}
.btn_sure_1:hover {
  opacity: 0.86;
}
.btn_quxiao_1:hover {
  opacity: 0.86;
}
</style>
