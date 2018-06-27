<template>
  <div class="content swiper_content"  @mousemove="move($event)" @mouseup="moveUp($event)" @touchmove="move($event)" @touchend="moveUp($event)" >
    <keep-alive>
    
 
    <router-view></router-view>
       </keep-alive>
    <!-- 底部滚动 -->
    <transition name="fade">
    
   
    <div class="bottom-swiper" v-show="isShowSwiper" @click="handleSwiper($event)">
      <div class="swiper-wrapper" ref="bSwiper" >
        <!-- 这个是随着小球一起走的蓝线 -->
        <div class="slider" ref="slider">
  
        </div>
        <!-- 这个是小球 -->
        <div class="path" @mousedown="moveDown($event)" @touchstart="moveDown($event)" ref="path">
          <!-- <div class="pathChild" style="width:10px;height:10px;border-radius: 50%;background-color:#fff;margin-left:4.5px;position:absolute;top:5px;"></div> -->
        </div>
      </div>
    </div>
     </transition>
  </div>
</template>

<script>
var scrolL_top_count = 0;
var scrolL_bottom_count = 0;
//谷歌等
function _webkit_moveWheel(e) {
  e = e || widnow.event;
  let detail = e.wheelDelta || e.detail;
  let moveForwarStep = -1;
  let moveBackStep = 1;
  let step = 0;
  if (detail > 0) {
    step = moveForwarStep * 100;
  } else {
    step = moveBackStep * 100;
  }


  document.getElementsByClassName("swiper_content")[0].scrollLeft += step;
}
//火狐
function _FireFox_moveWheel(e) {
  e = e || widnow.event;
  let detail = e.wheelDelta || e.detail;
  let moveForwarStep = 1;
  let moveBackStep = -1;
  let step = 0;
  if (detail > 0) {
    step = moveForwarStep * 100;
  } else {
    step = moveBackStep * 100;
  }

  document.getElementsByClassName("swiper_content")[0].scrollLeft += step;
}
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
      document
        .querySelector(".swiper_content")
        .addEventListener("DOMMouseScroll", e => {
          e = e || window.event;
          let detail = e.detail;
          const span = "SPAN";
          let domNode = null; //存储父元素span节点
          let domCommon = null; //存储添加的节点
          let domParent = null; //存储span父节点
          let dom = e.target;
          if (dom.classList.contains("classify-div")) {
            _FireFox_moveWheel(e);
            return;
          } else if (dom.classList.contains("content_classify")) {
            _FireFox_moveWheel(e);
            return;
          } else if (dom.classList.contains("content-title")) {
            _FireFox_moveWheel(e);
            return;
          } else if (dom.classList.contains("icon-text")) {
            _FireFox_moveWheel(e);
            return;
          } else if (dom.classList.contains("content-vip")) {
            _FireFox_moveWheel(e);
            return;
          }

          if (dom.offsetParent.parentNode.nodeName == span) {
            domNode = dom.offsetParent.parentNode;
          } else {
            if (dom.nodeName == span) {
              domNode = dom;
            } else if (dom.classList.contains("icon-addcontent")) {
              domNode = dom.parentNode.parentNode.previousElementSibling;
            } else if (dom.classList.contains("template-add-content")) {
              domNode = dom.parentNode.previousElementSibling;
            } else if (dom.classList.contains("content-container")) {
              domNode = dom.childNodes[0];
            } else if (dom.classList.contains("content-item")) {
              domNode = dom.parentNode;
            } else {
             
             
            }
          }

          if (domNode.nodeName == span) {
            domNode.style.display = "block";
            domCommon = domNode.nextElementSibling;
            domParent = domNode.parentNode;
            domParent.style.transitionDuration = "1s";

            if (
              domNode.offsetHeight + domCommon.offsetHeight >=
              domParent.offsetHeight - 100
            ) {
              if (
                domParent.scrollHeight - domParent.scrollTop ===
                domParent.clientHeight
              ) {
                if (detail < 0) {   //向下滚动
                  scrolL_bottom_count = 0;
                }

                if (scrolL_bottom_count >= 2) {
                  _FireFox_moveWheel(e);
                }
                scrolL_bottom_count += 1;
              } else if (domParent.scrollTop === 0) {
                if (detail > 0) {     //向上滚动
                  scrolL_top_count = 0;
                }

                if (scrolL_top_count >= 2) {
                  _FireFox_moveWheel(e);
                }
                scrolL_top_count += 1;
              }
            } else {
              _FireFox_moveWheel(e);
            }
          }
        });
      document
        .querySelector(".swiper_content")
        .addEventListener("mousewheel", e => {
          e = e || window.event;
          let wheelDelta = e.wheelDelta;
          const span = "SPAN";
          let domNode = null; //存储父元素span节点
          let domCommon = null; //存储添加的节点
          let domParent = null; //存储span父节点
          let dom = e.target;
          if (dom.classList.contains("classify-div")) {
            _webkit_moveWheel(e);
            return;
          } else if (dom.classList.contains("content_classify")) {
            _webkit_moveWheel(e);
            return;
          } else if (dom.classList.contains("content-title")) {
            _webkit_moveWheel(e);
            return;
          } else if (dom.classList.contains("icon-text")) {
            _webkit_moveWheel(e);
            return;
          } else if (dom.classList.contains("content-vip")) {
            _webkit_moveWheel(e);
            return;
          }

          if (dom.offsetParent.parentNode.nodeName == span) {
            domNode = dom.offsetParent.parentNode;
          } else {
            if (dom.nodeName == span) {
              domNode = dom;
            } else if (dom.classList.contains("icon-addcontent")) {
              domNode = dom.parentNode.parentNode.previousElementSibling;
            } else if (dom.classList.contains("template-add-content")) {
              domNode = dom.parentNode.previousElementSibling;
            } else if (dom.classList.contains("content-container")) {
              domNode = dom.childNodes[0];
            } else if (dom.classList.contains("content-item")) {
              domNode = dom.parentNode;
            } else {
          
            }
          }

          if (domNode.nodeName == span) {
            domNode.style.display = "block";
            domCommon = domNode.nextElementSibling;
            domParent = domNode.parentNode;
            domParent.style.transitionDuration = "1s";
            if (
              domNode.offsetHeight + domCommon.offsetHeight >=
              domParent.offsetHeight - 100
            ) {
              if (
                domParent.scrollHeight - domParent.scrollTop ===
                domParent.clientHeight
              ) {
                if (wheelDelta > 0) {
                  //向上滚动
                  scrolL_bottom_count = 0;
                }
                if (scrolL_bottom_count >= 2) {
                  _webkit_moveWheel(e);
                }
                scrolL_bottom_count += 1;
              } else if (domParent.scrollTop === 0) {
                if (wheelDelta < 0) {
                  //向上滚动
                  scrolL_top_count = 0;
                }

                if (scrolL_top_count >= 2) {
                  _webkit_moveWheel(e);
                }
                scrolL_top_count += 1;
              }
            } else {
              _webkit_moveWheel(e);
            }
          }
        });
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
          }else{
            return;
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
      if(event.touches){
        var evTouch_Pc = event.touches[0];
      }else{
        var evTouch_Pc = event;
      }
      const ALL = 248; //这个是减去左边project列的宽度

      if (this.isDowm) {
        let pathLeft = parseInt(evTouch_Pc.clientX) - ALL - 7.5; //应该滚动的位置

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
        if (evTouch_Pc.clientY <= 86) {
          this.isDowm = false;
        }
        if (evTouch_Pc.clientY <= 0) {
          this.isDowm = false;
        }
        if (evTouch_Pc.clientY >= window.innerHeight - 1) {
          this.isDowm = false;
        }
        if (evTouch_Pc.clientX <= 250) {
          this.isDowm = false;
        }
        if (evTouch_Pc.clientX >= window.innerWidth - 1) {
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
    },
    touchDown(event){

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