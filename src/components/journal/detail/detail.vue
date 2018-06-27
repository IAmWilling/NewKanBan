<template>
  <div>
    <div class="content-left" >
      <div v-for="(item,index) in this.$store.state.journalList" :key="index">
        <div class="title-top" v-if="item.caozuo.length">
          {{item.date}}
        </div>
        <div class="top" v-if="item.caozuo.length">
  
          <div class="content-text" v-for="i in item.caozuo" :key="i.cardTitle">
            <div class="text-item">
              {{i.user}} 将  <b>{{i.cardTitle}}</b> 从{{i.oldClassify}}移动到{{i.newClassify}}
            </div>
            <div class="text-time">
               {{i.time}}
            </div>
          </div>
        </div>
      </div>

    </div>
  
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    mounted(){
      
    },
    methods: {
      GetDateStr(AddDayCount) {
        var dd = new Date()
        dd.setDate(dd.getDate() + AddDayCount) //获取AddDayCount天后的日期
        var y = dd.getFullYear()
        var m = dd.getMonth() + 1 //获取当前月份的日期
        var d = dd.getDate()
        var q = dd.getDay() //获取当前星期X(0-6,0代表星期天)
        switch (q) {
          case 0:
            q = '周日'
            break
          case 1:
            q = '周一'
            break
          case 2:
            q = '周二'
            break
          case 3:
            q = '周三'
            break
  
          case 4:
            q = '周四'
            break
          case 5:
            q = '周五'
            break
          case 6:
            q = '周六'
            break
        }
        return m + '月' + d + '日' + '  ' + q
      }
    }
  }
</script>
<style scoped>
  .content-left {
    display: inline-block;
    width: 1600px;
    background: #fff;
    height: 800px;
    border-radius: 5px;
    margin-top: 30px;
    overflow: auto;
  }
  .content-right {
    display: inline-block;
    width: 400px;
    background: #fff;
    height: 800px;
    margin-left: 20px;
  }
  .top {
    width: 1500px;
    margin: 0 auto;
  }
  .bottom {
    width: 1500px;
    margin: 0 auto;
    height: 360px;
  
    margin-top: 5px;
  }
  .title-top {
    height: 30px;
    padding: 10px;
    line-height: 30px;
    padding-top: 20px;
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: #03a9f4;
    text-align: justify;
    font-weight: 500;
    padding-left: 50px;
  }
  .content-text {
    height: 30px;
    padding: 10px;
    line-height: 30px;
    display: flex;
  }
  .text-item {
    flex: 0 0 1350px;
    font-family: PingFang-SC-Medium;
    font-size: 18px;
    color: #333333;
    text-align: justify;
  }
  .text-time {
    flex: 1;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #888888;
    text-align: justify;
  }
</style>
