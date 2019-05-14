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
          path:'leave',
          component: resolve => require(['./components/pages/Leave.vue'], resolve)
        },
        {
          path:'leaverecord',
          component: resolve => require(['./components/pages/LeaveRecord.vue'], resolve)
        },
        {
          path:'class',
          component: resolve => require(['./components/pages/Class.vue'], resolve)
        },
        {
          path:'student',
          component: resolve => require(['./components/pages/Student.vue'], resolve)
        },
        {
          path:'MyAttendance',
          component: resolve => require(['./components/pages/MyAttendance.vue'], resolve)
        },
        {
          path:'AttendanceManage',
          component: resolve => require(['./components/pages/AttendanceManage.vue'], resolve)
        },
        {
          path:'noticerecord',
          component: resolve => require(['./components/pages/NoticeRecord.vue'], resolve)
        },
        {
          path:'insertInfo',
          component: resolve => require(['./components/pages/StudentInfo.vue'], resolve)
        },
        {
          path:'editor',
          component: resolve => require(['./components/pages/HtmlEditor.vue'], resolve)
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
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }
  ]
})
