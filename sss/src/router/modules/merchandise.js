import Layout from '@/layout'

export default {
    path: "/merchandise",
    component: Layout,
    redirect: "/merchandise/merchandise1",
    name: "Merchandise",
    meta: { title: "商品管理", icon: "table" },
    children: [
      {
        path: "merchandise1",
        name: "Merchandise1",
        component: () => import("@/views/merchandises/merchandise1"),
        meta: { title: "商品类型" },
      },
      {
        path: "merchandise2",
        name: "Merchandise2",
        component: () => import("@/views/merchandises/merchandise2"),
        meta: { title: "商品管理" },
      },
    ],
  }