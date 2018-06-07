<template>
  <div class="content swiper_content" @mousemove="move($event)" @mouseup="moveUp($event)">

    <router-view></router-view>
     <div class="bottom-swiper" v-show="isShowSwiper">
       <div class="swiper-wrapper" >
         <div class="slider" ref="slider">
          
         </div>
         <div class="path" @mousedown="moveDown($event)" ref="path">
            <div style="width:10px;height:10px;border-radius: 50%;background-color:#fff;margin:0 auto;;position: relative;top:4.5px;left:-0.3px;"></div>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: "agilityContent",
  data() {
    return {
      isDowm: false, //是否按下鼠标
      moveX: 0,   
      a: null,      //获取小球初始坐标
      isShowSwiper:false,
    };
  },
  created() {
    this.$nextTick(() => {
      this.a = document.querySelector(".path").getBoundingClientRect().left;
      let ref = setInterval(()=>{
        if(!document.querySelector(".classify-div")){
          return;
        }
        if(document.querySelector(".classify-div").offsetWidth>1600){
          this.isShowSwiper = true;
          clearInterval(ref);
        }
      },1000)
    });
  },
  methods: {
    moveDown(event) {
      this.isDowm = true;
      console.log(document.querySelector(".swiper_content").scrollLeft);
      this.moveX = event.clientX;

      // let path = this.$refs.path;
      // console.log(event.pageX);
      // path.style.left = event.clientX + "px";
    },
    move(event) {
      let path = this.$refs.path;
      let x = event.clientX;
      //超过界限后
      if (
        document.querySelector(".path").getBoundingClientRect().left <
        document.querySelector(".slider").getBoundingClientRect().left
      ) {
        path.style.left = 0 + "px";
        this.isDowm = false;
      }
      //超过界限后
      if (
        document.querySelector(".path").getBoundingClientRect().left >
        document.querySelector(".slider").getBoundingClientRect().left + 1500
      ) {
        path.style.left = 1480 + "px";
        this.isDowm = false;
      }
      if (this.isDowm) {
        path.style.left = parseInt(x) - parseInt(this.a) - 335 + "px";
        this.$refs.slider.style.width = parseInt(x) - parseInt(this.a)- 335 + "px";
     
           document.querySelector(".swiper_content").scrollLeft =
          (parseInt(x) - parseInt(this.a)- 335) * 1.3;
       console.log(document.querySelector(".swiper_content").scrollLeft)
        console.log(path.style.left);
      }
    },
    moveUp(event) {
      this.isDowm = false;
    }
  }
};
</script>
<style scoped>
.content {
  width: 1630px;
  height: 845px;
  
  overflow: hidden;
  display: inline-block;
}
.content::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 9px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 9px;
}
.content::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px #03a9f4;
  background: #03a9f4;
}
.content::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.bottom-swiper {
  background: #ffffff;
  padding: 20px;
  box-shadow: 0 -2px 5px 0 rgba(241, 242, 244, 0.5);
  position: fixed;
  bottom: 0px;
  width: 1630px;
  height: 5px;
}
.swiper-wrapper {
  margin: 0 auto;
  height: 5px;
  width: 1500px;
  background: #eeeeee;
  border-radius: 3px;
}
.slider {
  height: 5px;
  width: 0px;
  background: #03a9f4;
}
.path {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #03a9f4;
  cursor: pointer;
  position: relative;
  top: -10px;
}
</style>



