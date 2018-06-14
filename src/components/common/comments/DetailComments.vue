<template>
  <div>
    <v-modal name="DetailModal">
      <div class="v-modal1">
        <div class="header">{{DetailTitle}}</div>
        <hr style="width: 629px; height: 1px; background-color: #e9ecee; margin: 0; border: none;">
        <div class="mid">
          <div class="details" v-html="marked"></div>
          <div class="img-div" v-show="isShowImgs(DetailImg)">
            <img  :src="'http://10.2.5.101:3000/' + DetailImg" alt="" style="width:auto;height:auto;max-width:100%;max-height:330px;display:block;margin:0 auto;">
          </div>
          <div class="comment-box">
            <div class="comment" v-for="(comment,index) in DetailComments" :key="index"><span style="color: #448df6;">{{comment.user_name}}</span> ：{{comment.comment}}</div>
          </div>
          <div class="input-box">
            <v-input class="input-place" v-model="content" placeholder="此处输入评论"></v-input>
            <v-button class="input-button" @click="publish">发布</v-button>
          </div>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
import axios from "axios";
import marked from "marked";
var rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
export default {
  name: "manage",
  props: {
    DetailTitle: String,
    DetailContent: String,
    DetailComments: [Array, Object],
    DetailImg: {
      type: String
    }
  },
  data: function() {
    return {
      content: ""
    };
  },
  computed: {
    marked() {
      return marked(this.DetailContent, { sanitize: true });
    }
  },
  methods: {
    deleteProject: function() {},
    clickBack: function() {
      this.youth.close("DetailModal");
    },
    //发布评论
    publish() {
      //发布评论
      if (
        this.$store.state.login != 999 ||
        this.$store.state.username == undefined
      ) {
        this.youth.toast("你还没有登录,无法评论...", true);
        this.$router.go("/login");
        return;
      }
      this.content = this.content.replace(/(^\s*)|(\s*$)/g, "");
      if (this.content.length != 0) {
        let Obj = {
          user_name: this.$store.state.username, //用户名
          content: this.content, //评论的内容
          title: this.DetailTitle //点击的卡片标题
        };
        //查找 当前查看评论的分类标题
        //因为是哦不能有重复标题所以这样有了新的循环方式 进行查找分类标题
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
              this.DetailTitle
            ) {
              var classify = this.$store.state.ViewClassificationArray[i].title;
            }
          }
        }
        axios
          .post("/api/ins-comment", {
            user_name: this.$store.state.username, //用户名
            content: this.content, //评论的内容
            projectName: this.$store.state.CurrentSelection, //当前选中project项目名称
            title: this.DetailTitle, //点击的卡片标题
            classify: classify
          })
          .then(res => {})
          .catch(error => {
            console.log(error);
          });
        this.$store.dispatch("addComment", Obj);
        this.content = "";
      } else {
        this.youth.toast("评论不能为空的！", true);
      }
    },
    isShowImgs(img) {
      if(img=="./content_images/" || img=="content_images/"){
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.v-modal1 {
  width: 629px;
  min-height: 0px;
  position: relative;
  .header {
    height: 75px;
    width: 584px;
    font-size: 24px;
    text-align: justify;
    margin-left: 45px;
    line-height: 3.2;
  }
  .mid {
    min-height: 0px;
    width: 629px;
    .details {
      width: 509px;
      max-height: 318px;
      background-color: #f7f7f7;
      margin-top: 14px;
      margin-left: 40px;
      padding: 20px;
      color: #888;
      word-break: break-all;
      word-wrap: break-word;
      overflow: auto;
      white-space: normal;
    }
    .comment-box {
      width: 629px;
      min-height: 40px;
      .comment {
        width: 519px;
        min-height: 40px;
        margin-left: 60px;
        line-height: 2.4;
        word-break: break-all;
        word-wrap: break-word;
        color: #888;
        // overflow: auto;
      }
    }
    .input-box {
      width: 629px;
      height: 55px;
      position: absolute;
      background-color: #f7f7f7;
      bottom: -50px;
      .input-place {
        margin-left: 52px;
        width: 350px;
      }
      .input-button {
        background-color: #448df6;
        color: #fff;
        margin-left: 83px;
        margin-top: 8px;
      }
    }
  }
}
.img-div {
  margin: 0 auto;
  max-width: 550px;
  max-height: 320px;
  padding: 15px;
}
</style>
