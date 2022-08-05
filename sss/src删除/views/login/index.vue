<template>
  <div class="login">
    <div class="login-mask">
      <!-- 头部图片 -->
      <div class="login-logo">
        <img src="~@/assets/imgs/logo.png" alt="" />
      </div>
      <!-- 头部图片 -->

      <!-- 表单 -->
      <div class="login-from">
        <!-- 账号 -->
        <el-form ref="userinfo" :model="userInfo" :rules="rules">
          <el-form-item prop="number">
            <el-input
              v-model="userInfo.number"
              placeholder="请输入账号"
              prefix-icon="el-icon-mobile-phone"
              type="text"
              :maxlength="16"
            />
          </el-form-item>
          <!-- 账号 -->

          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="userInfo.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              :type="passwordType"
              :maxlength="16"
            >
              <i
                slot="suffix"
                class="el-icon-remove-outline my-icon"
                @click="triggerPasswordType"
                v-if="passwordType === 'password'"
              ></i>
              <!-- 'eye' : 'eye-open' -->
              <i
                slot="suffix"
                class="el-icon-view my-icon"
                v-else
                @click="triggerPasswordType"
              ></i>
            </el-input>
          </el-form-item>
          <!-- 密码 -->

          <!-- 验证码 -->
          <el-form-item prop="code">
            <el-input
              v-model="userInfo.code"
              placeholder="请输入验证码"
              prefix-icon="el-icon-tickets"
              type="text"
              :maxlength="4"
            >
              <div slot="suffix" @click="getFileUpload">
                <img :src="imgUrl" class="suffix-img" />
              </div>
            </el-input>
          </el-form-item>
          <!-- 验证码 -->

          <!-- 登录 -->
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('userinfo')"
              :loading="isLoading"
            >
              {{ isLoading ? "登陆中" : "登录" }}
            </el-button>
          </el-form-item>
          <!-- 登录 -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getFileUpload } from "@/api/user";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        number: "admin",
        password: "admin",
        code: "",
      },

      // 验证条件
      rules: {
        // 账号
        number: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]{4,16}$/,
            message: "账号在4-16位字母或数字之间",
            trigger: "blur",
          },
        ],
        // 密码
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]{4,16}$/,
            message: "密码在4-16位字母或数字之间",
            trigger: "blur",
          },
        ],
        // 验证码
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]{4}$/,
            message: "验证码必须是4位",
            trigger: "blur",
          },
        ],
      },

      //登录发送的请求
      data: {
        loginName: "", //用户名
        password: "", //密码
        code: "", //验证码
        clientToken: "", //客户端请求验证码的token
        loginType: 0, //登录类型
      },

      //验证码地址
      imgUrl: "",
      //密码框
      passwordType: "password",
    };
  },

  computed: {},

  async created() {
    //获取验证码
    this.getFileUpload();
  },

  methods: {
    //登录
    submitForm(userinfo) {
      this.$refs[userinfo].validate((valid) => {
        if (!valid) return;
        this.SET_IS_LOADING(true);
        this.data.loginName = this.userInfo.number;
        this.data.password = this.userInfo.password;
        this.data.code = this.userInfo.code;
        this.login(this.data);
      });
    },
    //获取验证码图片
    async getFileUpload() {
      try {
        const random = (Math.random() * 10).toFixed(6);
        const res = await getFileUpload(random);
        this.imgUrl =
          "data:image/png;base64," +
          btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
        this.data.clientToken = random;
      } catch (error) {
        console.log(error);
      }
    },
    //切换密码框
    triggerPasswordType() {
      if (this.passwordType === "text") {
        this.passwordType = "password";
      } else {
        this.passwordType = "text";
      }
    },
    ...mapMutations("user", ["SET_IS_LOADING"]),
    ...mapActions("user", ["login"]),
  },
  computed: {
    ...mapState("user", ["isLoading"]),
  },
};
</script>

<style lang="scss" scoped>
.my-icon {
  font-size: 20px;
  margin-top: 17px;
  margin-right: 10px;
  cursor: pointer;
}
.suffix-img {
  display: flex;
  align-items: center;
  width: 150px;
  height: 50px;
  z-index: 99999999;
  // background-color: rgb(48, 32, 32);
  margin-right: -4px;
  margin-top: 1px;
  cursor: pointer;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url(~@/assets/imgs/bg.png) no-repeat;
  .login-mask {
    position: relative;
    width: 520px;
    height: 390px;
    background-color: #fff;
    border-radius: 10px;
    padding: 76px 35px 0 35px;
    .login-logo {
      position: absolute;
      top: -48px;
      left: 50%;
      transform: translateX(-50%);
      width: 96px;
      height: 96px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
::v-deep .el-input__inner {
  height: 52px;
  padding: 0 45px;
}
::v-deep .el-button--primary {
  width: 100%;
  height: 52px;
  background-color: #6b7def;
  border-radius: 10px;
}
::v-deep .el-input__icon {
  font-size: 18px;
  margin-top: 5px;
  margin-left: 8px;
}
</style>
