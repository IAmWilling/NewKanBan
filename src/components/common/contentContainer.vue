<template>
  <div class="classify-div">
    <!--这是视图数据渲染模块  -->
    <div class="content" v-for="items in this.$store.state.ViewClassificationArray" :key="items.title">
  
      <div class="content-title omit">
        {{items.title}}
      </div>
      <div class="content-container" @drop='drop($event)' @dragover='allowDrop($event)'>
        <transition-group enter-active-class="bounceInDown" leave-active-class="bounceOutUp">
  
  
          <div class="content-item animated" v-for="item in items.fenlei" draggable="true" :key="item.title" @dragstart="drapStartMove($event)">
            <div class="content-item-title omit" @click="openDetailComments(item.title,item.content,item.comments,item.img)" v-if="item.title">{{item.title}}</div>
            <p class="content-item-content" @click="openDetailComments(item.title,item.content,item.comments,item.img)"  v-if="item.content">{{item.content}}</p>
            <a class="iconfont" href="#" style="font-size:6px;color:#999999;position: absolute;top: 10px;
            left: 230px;" @click="sureDelete(items.title,item.title,item.content)">&#xe603;</a>
            <div class="img-div"  @click="openDetailComments(item.title,item.content,item.comments,item.img)"  :key="item.content">
              <img v-if="item.img" :src="item.img" alt="" style="width:100%;;max-height:120px;display:block;margin:0 auto;margin-top:30px;">
            </div>
          </div>
        </transition-group>
        <div class="content-item">
          <!-- /\ 增加内容模板    -->
          <div class="template-add-content">
            <a href="#" class="iconfont" @click="openClassifiedContentModal($event)" style="color:#448DF6;font-size:16px;display:inline-block;">&#xe609;&nbsp;&nbsp;&nbsp;添加内容</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 温情 的 没有内容的 提示 -->
   
     
  
  
  
  
    <!-- 这是添加模块 -->
    <div class="content">
      <div class="content-title">
        <!-- <a href="#" class="iconfont icon-text" @click="ShowMaskLayer">&#xe609;添加分类</a> -->
        <input v-model="classifyName" @focus="ffff" @blur="tttt" type="text" placeholder="＋ 添加分类" style="height:30px;font-size:20px;color:#999999;border:none;outline:none;background-color: #FAFAFA;
                      ">
      </div>
      <!-- <div class="content-container">
                      <div class="content-item">
        
                      </div>
                  </div> -->
    </div>


  


    <!-- ******************************************************************************************************************************************************* -->
    <!-- 遮罩层 -->
    <!-- 这是添加分类的窗口 -->
    <v-modal name="maskLayer" :canclose="false">
      <div class="addClassify">
        <div class="title-classify">
          <!-- 标题 -->
          <div class="title-text">
            <div class="iconfont icon-1">&#xe609;</div>
            <div class="title-content">新增分类</div>
            <div class="iconfont icon-2" @click="closeModal">&#xe603;</div>
          </div>
        </div>
        <div class="input-content">
          <input v-model="classifyName" type="text" placeholder="分类名称" class="input-content-text" @focus="focus" @blur="blur">
        </div>
        <div class="border-color" ref="border_color"></div>
        <a href="#" class="quxiao" @click="closeModal">取消</a>
        <a href="#" class="baocun" @click="addClassify">保存</a>
      </div>
    </v-modal>
    <!-- ******************************************************************************************************************************************************* -->
    <!-- 这是添加分类里面内容的窗口 -->
    <v-modal name="ClassifiedContent" :canclose="false">
      <div class="addContent">
        <div class="title-classify">
          <!-- 标题 -->
          <div class="title-text">
            <div class="iconfont icon-1">&#xe609;</div>
            <div class="title-content">添加内容</div>
            <div class="iconfont icon-2" @click="closeClassifiedContentModal">&#xe603;</div>
          </div>
        </div>
        <div class="input-ClassifiedContent">
          <!-- 标题 -->
          <div class="content-topic">
            <!-- 输入标题 -->
            <input v-model="ContentTopics" type="text" placeholder="输入标题" class="content-topic-input">
          </div>
          <div class="content-deital">
            <!-- 具体内容 -->
            <textarea v-model="ContentDetailsAre" placeholder="拖动文件或图片到这里，或者直接输入" name="text" id="content-text-textarea" cols="65" rows="15"></textarea>
          </div>
        </div>
        <!-- 显示上传图片名称 -->
        <div style="margin-left:40px;">显示的图片名称为：{{showImageName}}</div>
        <a href="#" class="quxiao" @click="closeClassifiedContentModal">取消</a>
        <a href="#" class="baocun" @click="AddCategoryContent">保存</a>
        <!-- 待 增加的功能 -->
        <div class="add-function">
          <a href="#" class="add-function-1" @click="openFile">
                                <span class="iconfont" style="font-size:23px;">&#xe606;</span>
                                <span style="position:relative;top:-3px;">添加图片</span> 
                            </a>
          <a href="#" class="add-function-2">
                                <span class="iconfont" style="font-size:18px;">&#xe602;</span>
                                <span style="position:relative;top:-3px;">添加附件</span> 
                            </a>
        </div>
        <input type="file" ref="file" @change="getFile($event)" id="file" style="display:none;">
      </div>
    </v-modal>
    <!-- ******************************************************************************************************************************************************************* -->
    <!-- 这是确定是否删除 -->
  
  
  
    <v-modal name="sureDeleteChildModal" :canclose="false">
      <div class="Modal_div">
        <div class="title_modal_div">
          <div class="text-title">提示</div>
          <div class="icon-title">
            <a href="#" class="iconfont" @click="cancelDeleteModal" style="font-size:12px;color:#888888;;">&#xe603;</a>
          </div>
        </div>
        <p class="modal_content_1">
          删除后不能恢复，确定要删除吗?
        </p>
        <div class="btn_modal_1">
          <a href="#" class="btn_sure_1" @click="sureDeleteChild">确定</a>
          <a href="#" class="btn_quxiao_1" @click=" cancelDeleteModal">取消</a>
        </div>
      </div>
    </v-modal>
  <detail-comments :DetailTitle="this.DetailTitle" :DetailContent="this.DetailContent" :DetailComments="this.DetailComments" :DetailImg="this.DetailImg " ></detail-comments>
  </div>
</template>

<script>
import axios from "axios";
import DetailComments from "./comments/DetailComments";
export default {
  name: "contentContainer",
  components: {
    DetailComments
  },
  data() {
    return {
      classifyName: "", //分类名称
      ContentTopics: "", //表示分类具体内容标题
      ContentDetailsAre: "", //分类具体内容详情
      CurrentClickCategory: "", //当前点击的分类名称 对增加内容做铺垫
      DragAndDropTitle: "", //表示被拖拽的标题title
      formerClassify: "", //原被拖放元素分类标题
      dom: "", //被拖拽的目标元素,
      ff: false, //获取焦点开关
      DeleteChildCard: {
        title: "",
        childTitle: "",
        content: "",
        projectName: ""
      },
      imgsrc: "", //图片路径
      showImageName: "", //这是现实图片的名称
      DetailTitle: "", //这是点击后详情传入得卡片标题
      DetailContent: "", //这是点击详情后传入卡片的内容
      DetailComments: [], //点击详情后传入得聊天数组
      DetailImg: "" //点击详情后传入得图片base64数据放入src中
    };
  },
  methods: {
    ShowMaskLayer() {
      this.youth.open("maskLayer");
    },
    closeModal() {
      this.youth.close("maskLayer");
    },
    //打开添加分类的内容窗口
    openClassifiedContentModal(e) {
      //获取分类标题
      if (this.$store.state.jurisdiction == 1) {
        this.CurrentClickCategory =
          e.target.parentNode.parentNode.parentNode.parentNode.childNodes[0].innerText;

        this.youth.open("ClassifiedContent");
      } else {
        this.youth.toast("您不是管理员无权操作...", true);
      }
    },
    //关闭增加分类内容窗口
    closeClassifiedContentModal() {
      this.showImageName = "";
      this.imgsrc = "";
      this.youth.close("ClassifiedContent");
    },
    //获取焦点 下方div伸长变色
    focus() {
      this.$refs.border_color.classList.add("border_color");
    },
    ffff() {
      this.ff = true;
    },
    //失去焦点时候创建分类
    tttt() {
      if (this.$store.state.jurisdiction == 1) {
        if (this.ff) {
          this.classifyName = this.classifyName.replace(/(^\s*)|(\s*$)/g, "");
          //分类名称不能为空的
          if (this.classifyName.length != 0) {
            //检测名称是否用重复现象
            for (
              let i = 0;
              i < this.$store.state.ViewClassificationArray.length;
              i++
            ) {
              if (
                this.classifyName ==
                this.$store.state.ViewClassificationArray[i].title
              ) {
                this.youth.toast("检测到名称有重复现象!", true);
                return;
              }
            }

            //发送---------------------------------------------------------------------
            axios
              .post("/api/ins-class", {
                CurrentSelection: this.$store.state.CurrentSelection, //当前选中的project
                classifyName: this.classifyName //分类名称
              })
              .then(data => {
                console.log(data);
              })
              .catch(error => {
                console.log(error);
              });
            //------------------------------------------------------------------------

            this.$store.dispatch("addClassify", this.classifyName);
            this.classifyName = "";
          } else {
            this.youth.toast("名称不能为空的!", true);
          }
          this.ff = false;
        }
      } else {
        this.youth.toast("您不是管理员无权操作...", true);
      }
    },
    //当输入框失去焦点时候
    blur() {
      this.$refs.border_color.classList.remove("border_color");
    },
    //增加分类
    addClassify() {
      //去掉前后空格
      this.classifyName = this.classifyName.replace(/(^\s*)|(\s*$)/g, "");
      //分类名称不能为空的
      if (this.classifyName.length != 0) {
        //检测名称是否用重复现象
        for (
          let i = 0;
          i < this.$store.state.ViewClassificationArray.length;
          i++
        ) {
          if (
            this.classifyName ==
            this.$store.state.ViewClassificationArray[i].title
          ) {
            this.youth.toast("检测到名称有重复现象!", true);
            return;
          }
        }
        this.$store.dispatch("addClassify", this.classifyName);
        this.classifyName = "";
        this.youth.close("maskLayer");
      } else {
        this.youth.toast("名称不能为空的!", true);
      }
    },
    //增加分类里面的内容任务
    AddCategoryContent() {
      if (this.$store.state.jurisdiction == 1) {
        //删除前后空格
        this.ContentDetailsAre = this.ContentDetailsAre.replace(
          /(^\s*)|(\s*$)/g,
          ""
        );
        this.ContentTopics = this.ContentTopics.replace(/(^\s*)|(\s*$)/g, "");
        if (this.ContentTopics.length != 0) {
          //判断是否有重复名称[]
          //检查在当前项目中所有分类中的名称是否有重复现象
          for (
            let i = 0;
            i < this.$store.state.ViewClassificationArray.length;
            i++
          ) {
            for (
              let j = 0;
              j < this.$store.state.ViewClassificationArray[i].fenlei.length;
              j++
            ) {
              if (
                this.$store.state.ViewClassificationArray[i].fenlei[j].title ==
                this.ContentTopics
              ) {
                this.youth.toast("检查到在这些分类中已有名称！", true);
                return;
              }
            }
          }

          let Array = {
            title: this.ContentTopics, //内容标题
            content: this.ContentDetailsAre, //详细内容
            img: this.imgsrc, //加上图片
            comments: [] //这是一个评论功能数组
          };
          //当前分类名称[0]   添加的内容标题和详细内容[1]
          let arr = [this.CurrentClickCategory, Array];

          //发送---------------------------------------------------------------------
          axios
            .post("/api/ins-content", {
              title: this.ContentTopics, //内容标题
              content: this.ContentDetailsAre, //详细内容
              img: this.imgsrc, //加上图片
              CurrentSelection: this.$store.state.CurrentSelection, //当前选择project项目
              CurrentClickCategory: this.CurrentClickCategory //分类名称
            })
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.log(error);
            });

          //--------------------------------------------------------------------------

          this.$store.dispatch("AddTheCurrentCategoryContent", arr);
          this.ContentTopics = "";
          this.ContentDetailsAre = "";
          this.showImageName = "";
          this.imgsrc = "";
          this.youth.close("ClassifiedContent");
        }
      } else {
        this.youth.toast("您不是管理员无权操作...", true);
      }
    },
    //拖拽功能 ！！！！！！！！！！！
    drapStartMove(e) {
      this.dom = e.currentTarget;
      e.dataTransfer.setData("text", ""); //由于要求火狐必须设置有拖拽数据才可以展示拖拽

      this.DragAndDropTitle = this.dom.childNodes[0].innerText;
      this.formerClassify = this.dom.parentNode.parentNode.parentNode.childNodes[0].innerText;
      console.log(this.formerClassify);
    },
    drop(e) {
      if (this.$store.state.jurisdiction == 1) {
        let obj = {
          placeTheTitle: e.target.parentNode.childNodes[0].innerText, //拖放到的分类标题
          DragAndDropTitle: this.DragAndDropTitle, //拖拽元素标题
          formerClassify: this.formerClassify //原拖放分类
        };
        //发送--------------------------------------------------------------
        axios
          .post("/api/move", {
            placeTheTitle: e.target.parentNode.childNodes[0].innerText, //拖放到的分类标题
            nowClassify: this.$store.state.CurrentSelection, //当前选中的project项目
            DragAndDropTitle: this.DragAndDropTitle //拖拽元素标题
          })
          .then(data => {
            console.log("拖拽成功！" + data);
          })
          .catch(error => {
            console.log("拖拽写数据失败！" + error);
          });
        this.$store.commit("dragAndDrop", obj);

        // 发送 ----------------日志动态----------------------------
        let date = new Date(this.getTimes(1));
        let time = date.getTime() / 1000;
        let object = {
          date: this.getTimes(4),
          array: {
            time: this.getTimes(3),
            user: this.$store.state.username,
            cardTitle: this.DragAndDropTitle,
            oldClassify: this.formerClassify,
            newClassify: e.target.parentNode.childNodes[0].innerText
          }
        };
        axios
          .post("/api/ins-journal", {
            date: this.getTimes(5),
            timestamp: time,
            time: this.getTimes(3),
            user: this.$store.state.username,
            cardTitle: this.DragAndDropTitle,
            oldClassify: this.formerClassify,
            newClassify: e.target.parentNode.childNodes[0].innerText
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
        this.$store.dispatch("pushJournal", object);
        //------------------------------------------------------------------

        e.preventDefault();
      } else {
        this.youth.toast("您不是管理员无权操作...", true);
      }
    },
    allowDrop(e) {
      if (e.target.classList.contains("content-container")) {
        e.preventDefault();
      }
    },
    sureDelete(title, childTitle, content) {
      this.DeleteChildCard.title = title; //分类标题
      this.DeleteChildCard.childTitle = childTitle; //卡片标题
      this.DeleteChildCard.content = content; //卡片内容
      this.DeleteChildCard.projectName = this.$store.state.CurrentSelection;
      this.youth.open("sureDeleteChildModal");
      //   let Array = {
      //     title:title,
      //     childTitle:childTitle,
      //     content:content
      //   }
      //   //确认删除子任务
      // this.$store.dispatch("sureDeleteChild",Array);
    },
    //确认删除按钮
    sureDeleteChild() {
      if (this.$store.state.jurisdiction == 1) {
        axios
          .post("/api/del-content", this.DeleteChildCard)
          .then(data => {
            console.log("删除成功！" + data);
          })
          .catch(error => {
            console.log("删除失败 ！！！" + error);
          });
        this.$store.dispatch("sureDeleteChild", this.DeleteChildCard);
        this.youth.close("sureDeleteChildModal");
      } else {
        this.youth.toast("您不是管理员无权操作...", true);
      }
    },
    cancelDeleteModal() {
      this.youth.close("sureDeleteChildModal");
    },
    //打开隐藏的文件上传
    openFile() {
      document.getElementById("file").click();
    },
    //核心获取图片
    getFile(el) {
      let _this = this;
      let files = el.target.files[0];
      this.showImageName = files.name;
      if (!el || !window.FileReader) return;
      let reader = new FileReader();
      reader.readAsDataURL(files);

      reader.onloadend = function() {
        _this.imgsrc = this.result;
        console.log(this.result);
      };
      reader.onload = function(event) {
        console.log(event.target.result);
      };
    },
    //打开详情 查看 评论等
    openDetailComments(title, content, comments, imgsrc) {
      this.DetailTitle = title;
      this.DetailContent = content;
      this.DetailComments = comments;
      this.DetailImg = imgsrc;
      console.log(this.DetailComments);
      this.youth.open("DetailModal");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../static/icon.css";

.classify-div {
  display: inline-block;
  height: 845px;
  overflow-y: hidden;
  white-space: nowrap;
  overflow-x: auto;
}

.content {
  overflow: hidden;
  display: inline-block;
  height: 800px;
  width: 280px;

  margin-top: 38px;
  margin-left: 20px;
}

.content-title {
  font-family: PingFang-SC-Medium;
  font-size: 20px;
  color: #222222;
  text-align: left;
  padding: 10px 10px 10px 15px;
}
.content-container {
  height: 750px;
  width: 280px;

  overflow-y: auto;
  overflow-x: hidden;
}
.content-container::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.content-container::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px #03a9f4;
  background: #03a9f4;
}
.content-container::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.content-item-title {
  position: relative;
  margin: 0 auto;
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #333333;
  text-align: justify;
  width: 220px;
  height: 25px;

  top: 30px;
  font-weight: bold;
}
.content-item-content {
  width: 222px;
  max-height: 105px;

  margin: 0 auto;
  margin-top: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-family: PingFang-SC-Medium;
  word-wrap: break-word;
  white-space: normal;
  font-size: 16px;
  color: #666666;
  -moz-box-orient: vertical;
}
.content-item {
  width: 250px;
  margin: 0 auto;
  min-height: 235px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.38);
  margin-bottom: 18px;
  position: relative;
}
.icon-text {
  font-family: PingFang-SC-Medium;

  color: #999999;
  text-align: center;
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
.template-add-content {
  padding: 110px 60px 90px 60px;
  height: 25px;
}
.addContent {
  width: 629px;
  height: 560px;
  background: #ffffff;
  box-shadow: 0 27px 50px 0 rgba(0, 0, 0, 0.4);
}
.input-ClassifiedContent {
  width: 549px;
  height: 358px;
  margin: 0 auto;
  background: #f7f7f7;
  border-radius: 2px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.content-topic {
  height: 60px;
  width: 529px;
  border-bottom: solid 1px #e9e9e9;
  margin-left: 20px;
  font-family: PingFangSC-Semibold;
  line-height: 60px;
}
.content-topic-input {
  font-size: 20px;
  color: #999999;
  letter-spacing: 0;
  text-align: justify;
  outline: none;
  border: none;
  background: #f7f7f7;
  font-weight: bold;
}
.content-deital {
  width: 529px;
  margin-left: 20px;
  height: 267px;
  margin-top: 20px;
}
#content-text-textarea {
  width: 510px;
  height: 260px;
  border: none;
  background-color: #f7f7f7;
  outline: none;
  font-family: PingFang-SC-Medium;
  font-size: 16px;
  color: #888888;
  text-align: justify;
  resize: none;
}
.add-function {
  display: flex;
  width: 250px;
  height: 22px;

  position: relative;
  top: -30px;
  left: 40px;
}
.add-function-1 {
  display: block;
  flex: 0 0 100px;
  height: 22px;
  line-height: 22px;
  margin-right: 8px;
  font-family: PingFang-SC-Medium;
  font-size: 16px;
  color: #888888;
  letter-spacing: 0;
  text-align: justify;
}
.add-function-2 {
  display: block;
  flex: 1;
  height: 22px;
  line-height: 22px;
  font-family: PingFang-SC-Medium;
  font-size: 16px;
  color: #888888;
  letter-spacing: 0;
  text-align: justify;
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
.img-div {
  width: 200px;
  min-height: 100px;
  margin: 0 auto;
}
</style>
