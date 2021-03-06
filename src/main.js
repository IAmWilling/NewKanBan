// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/youth/youth.css'
import youthjs from '../static/youth/youth.js'
import store from './store/index.js'
import '../static/animate/animate.css'

Vue.use(youthjs)
Vue.config.productionTip = false


//定义一个获取时间（字符串数字）公共函数
function getTime(num) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (month < 10) {
        month = "0" + String(month);
    }
    if (day < 10) {
        day = "0" + String(day);
    }
    if (hour < 10) {
        hour = "0" + String(hour);
    }
    if (minute < 10) {
        minute = "0" + String(minute);
    }
    if (second < 10) {
        second = "0" + String(second);
    }
    if (num == 1) {
        return year + "-" + month + "-" + day + " 23:59:59";
    } else if (num == 2) {
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    } else if (num == 3) {
        return hour + ":" + minute;
    } else if (num == 4) {
        return date.getMonth() + 1 + "月" + date.getDate() + "日";
    } else if (num == 5) {
        return year + "-" + month + "-" + day;
    }


}
Vue.prototype.getTimes = getTime;



/* eslint-disable no-new */
new Vue({
        el: '#app',
        router,
        store,
        components: { App },
        template: '<App/>'
    })
    // console.error(`     
    // 支付宝打赏我：13223409577                                                             
    // @@@@@@@@@@@@@@        @@@@ ~@@@6       @@@@  6@@@  @@@@@@@@@@@@@6
    // @@          @@    @1  @@@@@3   ;@@@8     #@        @@          @6
    // @@  @@@@@@  @@        @@@@@@@@@6 &@8   @@. @@; @@  @@  @@@@@@  @6
    // @@  @@@@@@  @@        @@@@   #@6     $@  #@@@; @@  @@  @@@@@@  @6
    // @@  $$$$$%  @@  $$@1  @@@@$1 %$i &@8 $@$$@@@@@@$$  @@  $$$$$$  @6
    // @@          @@    @i  @@@@       &@8 $@  #@@@@@    @@          @6
    // &&&&&&&&&&&&&$  @@-v&$-v@@-n@^-~&- ^&+ @@+-@@; @@  &&&&&&&&&&&&&!
    //                 @@@1  @@@@@@@@@6       @@@@@@; @@                
    //   --&&@@--  &&@@&&@1  -n&& ~@+-. --~@&&  --&&@@@@&&&&  &&--      
    // !!@@  oo@@!!!!@@  oz!!o*  !1o@@6 &@@@3!  ~o  6@@@  !!!!  oo    !a
    // ####  ..@@######  .v@@....@3 #@6 $##@##      6@##..@@@@..      @6
    //   ii  nn@@  iiii  nnnv@@@@nzinnzi- .n. iiii  6@ii@@nnnn@@iiiiii@6
    // ..##... ##..##@@   ...##                 @@..8@####..  ##@@@@@@#3
    // zz  @@@@  @@uuzvu1@@@@ua                 vzzzzzuu  @@  uu@@zz@@  
    // @@  @@  @@    @@  @1                     . @@; @@        @@    @6
    // @@aaaaaa@@aaaaaa  @8aa                   ua@@; @@aa      @@  aa@6
    // @@@@@@          @@@i                       @@; @@  @@@@@@        
    // uu@@uuzzzzzzzzzzuuuazz +                 vz@@1zuuzz@@@@uuzzzz    
    //   @@@@ .@@@@..@@@# n@@#i                 #@@@@@@@@@. @@  @@@@@#  
    // @@@@@@@@    @@        @@                o@@@@@@            @@@@  
    // @@@@....#&  ..  ######.n@@##@@.~#@@@@##..#@@@~.##      &###....  
    //     @@@@@@@@@@  @@@1  @@@@ ~@. ;@@@8 $@@@@@  6@  @@@@@@@@@@@@@@  
    //   &&@@--@@@@--&&--@@&&----  -$&#@^-;&@@@@+-  .-  @@@@@@@@------  
    // @@      @@  @@@@   n@@@!  @3 #@6               @@@@@@@@@@@@  @@@6
    //                 @@@1   o@@@3 #@@@@@@@+   #@@@@@@@      @@  @@  @6
    // @@@@@@@@@@@@@#  @@@@@@    @3 #@@@- *@@@  #@  6@@@  @@  @@    @@@6
    // @@          @@     n@@@!       ;@@@8   @@.     @@      @@    @@  
    // @@  @@@@@@  @@    @@@@@@@@ ~@@@6     $@@@. @@; @@@@@@@@@@@@@@@@  
    // @@  @@@@@@  @@  @@@@@@           &@8 $@    @@@@  @@      @@@@    
    // @@  @@@@@@  @@  @@ n@@@@@@ ~@@@6 &@8   @@. @@@@  @@@@      @@    
    // @@          @@    @1      @3 #@@@@@@@@@    @@@@@@@@@@  @@  @@    
    // @@@@@@@@@@@@@@     n@@@@@@@3 #@@@- *@+       6@  @@      @@@@@@ 
    // 支付宝打赏我：13223409577  `)
    // console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // @????????????????p???ppppp???????pppppp??pppppp??????????????????*??????*???????????
    // @???????????*???????ppppp????????pppp?p???????p?*^^????????????????????*????????????
    // @???????????????????pp??p??????pp?????ppp*$#$$$##$$$$*?*?????????????????????**?????
    // @????????????????????pp???????????????pp^####$##$$####*????????????????*????????????
    // @?????????????????????pp???????????pp??$#######$^######???????????????????**??*?????
    // @?????????????????p??????????????????p####&??p?&*?%#@####&???????????????????***????
    // @?????????**???**??&^*ppp??p?*??????*p$##&?????&*p?$@#@@###&??**??????**????*****???
    // @???????????*****?*^&*&^^p????????*??*?%#^*&???*%&**$#####@@^?*????????**????**??***
    // @?p????????????**?*^&**^&*p??????*?????*p&*%&????**^&^#@@@@@#*****??****?????***?***
    // @?p????????????????&&***?^pp????*????????p^?*??***&^&&%#@@@@%*?***********?*********
    // @?p?pp????**??***???&&**?*^**p????????????p%^*?*^^*&^#@@@@@%***************?********
    // @p?????????*?****??p&?&^**%%^^^&**????????p*@%**??*&**&&^%?*************************
    // @??????*????*???***??*p^%%%%%%^^^^&&*??????p^#@$&&^^****&&%%%??*******************??
    // @???????**?????****??**p**%$%%%%^%^^^^^^^??p//p/*/*%****&&$%$$$&&&******************
    // @?????**********???*?p^$$$##^^#%%%%%%%%^^^%%%%$$$$^%%$$$$$##$$$$%$$^****************
    // @**?*?************????%@^&$#$*?&%$$$$$$$$%%%%%%%%%%%%%%%$%%$%%%%%%%$^?*****&****?***
    // @*****************?p^^%%%#$%?**???&^$$$%$$$$%$%%$$$$%$$%$$$$$$%%%%%%$&******&&******
    // @?*******??*?????*%@@@@#%^#$&*^*?****??*^%$$$$$$$$$$$$$$$$$$$$$$$#$$$$?*****&&&***&&
    // @*?****??????*&^$@@@@@@@@@@#@%^&&?*&*??***??*&$$$$$$$$$$$$$$$$$$$$$$$$*******&&****&
    // @*?******??*&%%$@#@@@@@@@@@@@@%p*^****??***???%$$$$$$$$$##$$%$%$$$$$$#******&*&^**&*
    // @*?****?*&#@@$$%$$@@@@@@@@@@@#%**?&&????****??%$$$$$$$$##$$$$#$$$$$$%#*****&&&&^^&&&
    // @********&@#@*?^^$@@@@@@@@@@@#&*?***&*******??^$$$$$$$$$$$$$$$$%$$$$%#***&*&&&&&^&&&
    // @********?&%@#%?p$@@@@@@@@@@@#?*******??*******$$$$$$$$$$$$$$%$##$$$%$^****&&&&&^^&&
    // @***************?&%$#@@@@@#%^^^??************?*^$$$$$$$$$$$$####$%%$$$$***&&&&&&&&&&
    // @*****************??pp/*$*p?^^pp^^***?*********?%$$#$##$$$$$$$$####$%%$&?***&&&&^&&&
    // @******************&&^$$**?p?^$$$&?*&^^*********&$$$###$#$$$$$$###$$#$$$****&&&*&&^&
    // @*****************&^??%$$$$$$$$%****&?p^********?$$#$###$$$#####$$$#$$$$$^**&&&*&*&&
    // @?****************^&*??^$$%$#^*???^%^*?&^*******?$$#######$$###$$$$##$#^^$*****&&&&&
    // @?**??*****?*****&%&%&**?^%&????***%%??*^&*****?*$$$$###$#$$$$$$$$$$^%$$$$#?*****&&&
    // @*/////ppppppppp/p?p*?p???pppppppp??&??p*??????p*^^^^^%%^^^^%%^&p?&%*&%^^^^^*???p???`)