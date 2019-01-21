import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// import Dashboard from './components/pages/Dashboard.vue'
// import test from './components/pages/test.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'dashboard',
          component: resolve => require(['./components/pages/Dashboard.vue'], resolve)
        },
        {
          path:'test',
          component: resolve => require(['./components/pages/test.vue'], resolve)
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
