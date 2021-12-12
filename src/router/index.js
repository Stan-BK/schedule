import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/schedule',
    component: Layout,
    redirect: '/schedule/index',
    children: [
      {
        path: 'index',
        name: 'schedule',
        component: () => import('@/views/schedule/index'),
        meta: { title: '课程表', icon: 'table' }
      }
    ]
  },

  {
    path: '/redirect',
    name: 'redirect',
    component: () => import('@/views/redirect')
  },

  {
    path: '/tb_class',
    component: Layout,
    redirect: '/tb_class/index',
    children: [
      {
        path: 'index',
        name: 'tb_class',
        component: () => import('@/views/tb_class/index'),
        meta: { title: '班级信息管理', icon: 'tb_class' }
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/index',
    children: [
      {
        path: 'index',
        name: 'teacher',
        component: () => import('@/views/teacher/index'),
        meta: { title: '教师信息管理', icon: 'teacher' }
      }
    ]
  },
  {
    path: '/classroom',
    component: Layout,
    redirect: '/classroom/index',
    children: [
      {
        path: 'index',
        name: 'classroom',
        component: () => import('@/views/classroom/index'),
        meta: { title: '教室管理', icon: 'classroom' }
      }
    ]
  },
  {
    path: '/userController',
    component: Layout,
    redirect: '/userController/index',
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/userController/index'),
        meta: { title: '用户信息管理', icon: 'people' }
      }
    ]
  },
  {
    path: '/userSetting',
    component: Layout,
    redirect: '/userSetting/index',
    children: [
      {
        path: 'index',
        name: 'userSetting',
        component: () => import('@/views/userSetting/index'),
        meta: { title: '设置', icon: '' }
      }
    ],
    hidden: true
  },
  {
    path: '/curriculum',
    name: 'curriculum',
    component: () => import('@/views/curriculum/index'),
    meta: { title: '课程表' },
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
