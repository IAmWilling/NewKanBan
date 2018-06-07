import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import contentContainer from '@/components/common/contentContainer'
// import content from '@/components/content/content'
import login from '@/components/login/login'
import journal from '@/components/journal/journal'
import journalDetail from '@/components/journal/detail/detail'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            children: [{
                path: '/HelloWorld/:id',
                component: () =>
                    import ('@/components/common/contentContainer')
            }]
        },
        {
            path: '/login',
            name: 'login',
            component: login,
        },
        {
            path: '/journal',
            name: 'journal',
            component: journal,
            children: [{
                path: '/journal/all',
                component: journalDetail
            }]
        }

    ]
})