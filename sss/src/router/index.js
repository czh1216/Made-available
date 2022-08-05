import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

// 引入模块
import examples from "./modules/example"
import nesteds from "./modules/nested"
import equipments from "./modules/equipment"
import personnels from "./modules/personnel"
import merchandises from './modules/merchandise'
import tacticss from "./modules/tactics"
import OrderForms from './modules/order-form'
import AccountCheckings from './modules/account-checking'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  // 首页路由
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '帝可得' },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

export const asyncRoutes = [
  examples,
  nesteds,
  equipments,
  personnels,
  merchandises,
  tacticss,
  OrderForms,
  AccountCheckings
]


const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [...constantRoutes,...asyncRoutes],
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
