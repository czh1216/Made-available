import Layout from '@/layout'

export default{
    path: "/nested",
    component: Layout,
    redirect: "/nested/menu1",
    name: "Nested",
    meta: {
      title: "点位管理",
      icon: "nested",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/nested/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "区域管理" },
      },
      {
        path: "menu2",
        component: () => import("@/views/nested/menu2/index"),
        name: "Menu2",
        meta: { title: "点位管理" },
      },
      {
        path: "menu3",
        component: () => import("@/views/nested/menu3/index"),
        name: "Menu3",
        meta: { title: "合作商管理" },
      },
    ],
  }