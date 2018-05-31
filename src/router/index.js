import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import contentContainer from '@/components/common/contentContainer'
// import content from '@/components/content/content'
import login from '@/components/login/login'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/index',
            name: 'HelloWorld',
            component: HelloWorld,
            children: [{
                path: '/HelloWorld/:id',
                component: () =>
                    import ('@/components/common/contentContainer')
            }]
        },
        {
            path: '/',
            name: 'login',
            component: login,
        }

    ]
})