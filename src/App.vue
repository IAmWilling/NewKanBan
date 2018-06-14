<template>
  <div id="app">

   <keep-alive>  
    <router-view/>
    </keep-alive> 
  
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
}
html::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 7px;
}
html::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px #03a9f4;
  background: #03a9f4;
}
html::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
body {
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  background: #fafafa;
  user-select: none;
}
/* @media screen and (min-width: 1200px) { 
  body {
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #fafafa;
  }
} */

.toggle-enter-active {
  transform: translate3D(0, 0, 0);
 
  transition-duration: 1s;
}

.toggle-leave-active {
  transform: translate3D(0, 0, 0);
 
  transition-duration:1s;
}

.toggle-enter {
  transform: translate3D(-120rem, 0, 0);

  transition-duration:1s;
}

.toggle-leave-to { /* .fade-leave-active below version 2.1.8 */
  transform: translate3D(-120rem, 0, 0);
  transition-duration: 1s;
}
.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  right: 0;
  transform: translateX(1000px);
  opacity: 0;
}
</style>
