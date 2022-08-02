
import { userLogin } from "@/api/user";
import { Message } from "element-ui";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    //控制登录按钮
    isLoading: false,
  },
  mutations: {
    LOGIN(state, payload) {
      state.userInfo = payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    SET_IS_LOADING(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    //登录发请求
    async login(context, payload) {
      try {
        const res = (await userLogin(payload)).data;
        if (res.success === false) {
          Message.error(res.msg);
        } else {
          context.commit("LOGIN", res);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_IS_LOADING", false);
      }
    },
  },
  getters: {},
};
