<template>
  <div class="content swiper_content"  @mousemove="move($event)" @mouseup="moveUp($event)">
  
    <router-view></router-view>
    <!-- 底部滚动 -->
    <transition name="fade">
    
   
    <div class="bottom-swiper" v-show="isShowSwiper" >
      <div class="swiper-wrapper" ref="bSwiper" @click="handleSwiper($event)">
        <!-- 这个是随着小球一起走的蓝线 -->
        <div class="slider" ref="slider">
  
        </div>
        <!-- 这个是小球 -->
        <div class="path" @mousedown="moveDown($event)" ref="path">
          <!-- <div class="pathChild" style="width:10px;height:10px;border-radius: 50%;background-color:#fff;margin-left:4.5px;position:absolute;top:5px;"></div> -->
        </div>
      </div>
    </div>
     </transition>
  </div>
</template>

<script>
var difference_value = 0;
export default {
  name: "agilityContent",
  data() {
    return {
      isDowm: false, //是否按下鼠标
      moveX: 0,
      a: null, //获取小球初始坐标
      isShowSwiper: false
    };
  },
  created() {
    this.$nextTick(() => {
      //计算一个差值    总区域 - 可视区域 = 差值 然后 差值 * 小球走的百分比 就能算出滚动多大长度

      window.onresize = () => {
        document.querySelector(".swiper_content").style.height =
          window.innerHeight - 86 + "px";
        //计算一个差值    总区域 - 可视区域 = 差值 然后 差值 * 小球走的百分比 就能算出滚动多大长度
        difference_value =
          document.querySelector(".classify-div").offsetWidth -
          document.querySelector(".swiper_content").offsetWidth;
        //根据计算比例逆运算 当改变这个窗口的时候滑动小球位置按比例开始变化
        if (this.$refs.path.style) {
          this.$refs.path.style.left =
            document.getElementsByClassName("swiper_content")[0].scrollLeft /
              difference_value *
              100 +
            "%";
          //  this.$refs.bSwiper.style.width = this.$refs.path.style.left;
          this.$refs.slider.style.width = this.$refs.path.style.left;
        }

        if (
          document.querySelector(".classify-div").offsetWidth >
          document.querySelector(".swiper_content").offsetWidth
        ) {
          this.isShowSwiper = true;
        } else {
          this.isShowSwiper = false;
        }
      };
      setInterval(() => {
        this.$nextTick(() => {
          if (
            document.querySelector(".classify-div") &&
            document.querySelector(".swiper_content")
          ) {
            difference_value =
              document.querySelector(".classify-div").offsetWidth -
              document.querySelector(".swiper_content").offsetWidth;
            if (this.$refs.path) {
              //根据可是比例进行计算
              this.$refs.path.style.left =
                document.getElementsByClassName("swiper_content")[0]
                  .scrollLeft /
                  difference_value *
                  100 +
                "%";
              //  this.$refs.bSwiper.style.width = this.$refs.path.style.left;
              this.$refs.slider.style.width = this.$refs.path.style.left;
            }

            if (difference_value > 0) {
              this.isShowSwiper = true;
              for (
                let i = 0;
                i < document.getElementsByClassName("content-container").length;
                i++
              ) {
                // .style.height =
                // window.innerHeight - 200 + "px";
                document.getElementsByClassName("content-container")[
                  i
                ].style.height =
                  window.innerHeight - 200 + "px";
              }
            } else {
              this.isShowSwiper = false;
              for (
                let i = 0;
                i < document.getElementsByClassName("content-container").length;
                i++
              ) {
                // .style.height =
                // window.innerHeight - 200 + "px";
                document.getElementsByClassName("content-container")[
                  i
                ].style.height =
                  window.innerHeight - 100 + "px";
              }
            }
          }
        });
      }, 500);
    });
  },
  methods: {
    moveDown(event) {
      this.isDowm = true;
      this.$refs.path.style.transform = "scale(1.2)";
    },
    move(event) {
      event = event || window.event;
      const ALL = 248; //这个是减去左边project列的宽度

      if (this.isDowm) {
        let pathLeft = parseInt(event.clientX) - ALL - 7.5; //应该滚动的位置
        console.log(event.clientX);
        let swiperLeftBoo = this.$refs.bSwiper.offsetWidth;

        this.$refs.path.style.left = pathLeft / swiperLeftBoo * 100 + "%";
        this.$refs.slider.style.width = this.$refs.path.style.left;
        document.getElementsByClassName("swiper_content")[0].scrollLeft =
          difference_value * (pathLeft / swiperLeftBoo);
        if (pathLeft / swiperLeftBoo * 100 >= 100) {
          this.isDowm = false;
        }
        if (pathLeft >= this.$refs.bSwiper.offsetWidth - 15) {
          this.isDowm = false;
        }
        if (pathLeft <= -7.5) {
          this.isDowm = false;
        }
        if (event.clientY <= 86) {
          this.isDowm = false;
        }
        if (event.clientY <= 0) {
          this.isDowm = false;
        }
        if (event.clientY >= window.innerHeight - 1) {
          this.isDowm = false;
        }
        if (event.clientX <= 250) {
          this.isDowm = false;
        }
        if (event.clientX >= window.innerWidth - 1) {
          this.isDowm = false;
        }
      }
    },
    moveUp(event) {
      if (this.isDowm) {
        this.isDowm = false;
        this.$refs.path.style.transform = "scale(1)";
      }
    },
    handleSwiper(event) {
      const ALL = 248;
      console.log(event.clientX);
      let pathLeft = parseInt(event.clientX) - ALL - 7.5; //应该滚动的位置
      let swiperLeftBoo = this.$refs.bSwiper.offsetWidth;
      if (pathLeft >= this.$refs.bSwiper.offsetWidth - 15) {
        return;
      }
      this.$refs.path.style.left = pathLeft / swiperLeftBoo * 100 + "%";
      this.$refs.slider.style.width = this.$refs.path.style.left;
      document.getElementsByClassName("swiper_content")[0].scrollLeft =
        difference_value * (pathLeft / swiperLeftBoo);
      if (pathLeft / swiperLeftBoo * 100 >= 100) {
        this.isDowm = false;
      }
    }
  }
};
</script>
<style scoped>
.content {
  width: 100%;
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
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0 -2px 5px 0 rgba(241, 242, 244, 0.5);
  position: fixed;
  bottom: 0px;
  width: calc(100% - 248px);
  height: 5px;
}
.swiper-wrapper {
  position: relative;
  height: 5px;
  background: #eeeeee;
  border-radius: 3px;
}
.slider {
  height: 5px;
  width: 0%;
  background: #03a9f4;
}
.path {
  width: 10px;
  height: 10px;
  background: #fff;
  margin: 0px 0 0 0px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  box-shadow: 0 0 0 5px #03a9f4;
  top: -8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>