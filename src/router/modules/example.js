import Layout from '@/layout'

export default {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    meta: { title: "工单管理", icon: "skill" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/examples/table"),
        meta: { title: "运营工单" },
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/examples/tree"),
        meta: { title: "运维工单" },
      },
    ],
  }