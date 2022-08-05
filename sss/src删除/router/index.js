import Vue from "vue";
import Router from "vue-router";

import examples from "./modules/example"
import nesteds from "./modules/nested"
import equipments from "./modules/equipment"
import personnels from "./modules/personnel"
import merchandises from './modules/merchandise'
import tacticss from "./modules/tactics"
import OrderForms from './modules/order-form'
import AccountCheckings from './modules/account-checking'

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index"),
        meta: { title: "帝可得", icon: "el-icon-price-tag" },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

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
    routes: [...constantRoutes, ...asyncRoutes]
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
