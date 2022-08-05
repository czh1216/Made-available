import Layout from "@/layout";
export default {
  path: "/order-form",
  component: Layout,
  children: [
    {
      path: "",
      component: () => import("@/views/order-form"),
      meta: { title: "订单管理", icon: "skill" },
    },
  ],
};
