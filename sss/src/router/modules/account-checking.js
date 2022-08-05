import Layout from "@/layout";
export default {
  path: "/account-checking",
  component: Layout,
  children: [
    {
      path: "",
      component: () => import("@/views/AccountChecking"),
      meta: { title: "对账统计", icon: "money" },
    },
  ],
};
