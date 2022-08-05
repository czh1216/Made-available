<template>
  <div class="login">
    <div class="login-mask">
      <!-- 头部 -->
      <div class="login-logo">
        <img src="@/assets/imgs/logo.png" alt="" />
      </div>
      

      <!-- 表单 -->
      <div class="login-from">
        <!-- 账号 -->
        <el-form ref="user" :model="user" :rules="rules">
          <el-form-item prop="loginName">
            <el-input
              v-model="user.loginName"
              placeholder="请输入账号"
              prefix-icon="el-icon-mobile-phone"
              :maxlength="16"
            />
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="user.password"
              prefix-icon="el-icon-unlock "
              placeholder="请输入密码"
              show-password
              :maxlength="16"
            />
          </el-form-item>

          <!-- 验证码 -->
          <el-form-item prop="code">
              <el-input
                v-model="user.code"
                prefix-icon="el-icon-circle-check "
                placeholder="请输入验证码"
                :maxlength="4"
                type="text"
              >
              <div slot="suffix" @click="getCode">
                <img class="suffix-img"
                :src="`https://likede2-java.itheima.net/api/user-service/user/imageCode/${user.clientToken}`"
                alt="" />
              </div>
              </el-input>
          </el-form-item>
        </el-form>

        <!--  -->
        <el-button type="primary" class="test" @click="btnOk">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, yanzm } from '@/api/user'

export default {
  components: {},
  data() {
    return {
      user: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0,
        msg: '',
      },
      token: this.$store.state.user.token,
      rules: {
        loginName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]{4,16}$/,
            message: "账号在4-16位字母或数字之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]{4,16}$/,
            message: "密码在4-16位字母或数字之间",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]{4}$/,
            message: "验证码必须是4位",
            trigger: "blur",
          },
        ],
      },
      userInfo: {},
    }
  },

  created() {
    this.getNum()
  },

  methods: {
    getNum() {
      var chars = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
        'y', 'z',
      ]
      var nums = ''
      for (var i = 0; i < 32; i++) {
        var id = parseInt(Math.random() * 61)
        nums += chars[id]
      }
      this.user.clientToken = nums
    },

    async getCode() {
      await yanzm(this.user.clientToken)
      // console.log(res)
      this.getNum()
    },
    async btnOk() {
      try {
        await this.$refs.user.validate()
        const { data } = await login(this.user)
        this.userInfo = data
        this.msg = data.msg
        this.token = data.token
        console.log(data);
        this.$store.dispatch('user/getUserInfo', this.userInfo)
        this.$store.dispatch('user/getCode', this.token)
        window.localStorage.setItem('DILIKE', this.token)
        if (this.user.loginName !== 'admin' && this.user.password !== 'admin') {
          this.$message.error('账号和密码错误')
        }

        if (this.token) {
          this.$router.push('/')
          this.$message.success('登录成功')
        } else {
          this.$message.error(this.msg)
          this.getCode()
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
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
  z-index: 9999999999999999;
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
