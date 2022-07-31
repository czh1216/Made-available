<template>
  <div class="login">
    <div class="LoginFn">
      <!-- logo -->
      <div class="Headline">
        <img src="~@/assets/logo.595745bd.png" alt="">
      </div>

      <el-form>
      <!-- 账号 -->
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-mobile" v-model="ruleForm" placeholder="请输入账号"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="pass">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="input" show-password></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="pass">
          <el-input prefix-icon="el-icon-notebook-2" type="password" v-model="ruleFormFn" autocomplete="off" placeholder="请输入验证码">
          </el-input>
          <div class="Captcha"><img src="" alt=""></div>
        </el-form-item>

        <el-form-item class="lnput">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// npm run dev
export default {
  data() {
    return {
      input: '',
      ruleFormFn: '',
      ruleForm: ''
    }
  },

  created() {},

  methods: {

  }
}
</script>

<style scoped lang="scss">
/* 背景 */
.login{
  position: relative;
  background: url('~@/assets/微信图片_20220730191634.jpg');
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
/* 登录框 */
.LoginFn{
  position: absolute;
  background-color: #fff;
  width: 518px;
  height: 388px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin-top: -194px;
  margin-left: -259px;
  -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
  padding: 76px 35px 0;
}
/* logo */
.Headline{
  position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
    img {
      width: 100%;
      height: 100%;
    }
}

.demo-ruleForm{
  .el-button--primary{
    width: 100%;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
  }
}
.el-button{
  width: 100%;
}

.Captcha{
  width: 50px;
  background-color: rgb(196, 81, 81);
}

.el-form-item{
  // height: 50px;
  .el-input__inner{
  height: 100%;
}
}
</style>
