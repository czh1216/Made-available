<template>
  <div class="navbar">
    <div class="navbar-login">
      <img src="@/assets/imgs/logo1.png" />
    </div>
    <div class="navbar-user">
      <div class="navbar-userImg">
        <img src="@/assets/imgs/userImg.png" />
      </div>
      <span>欢迎您, admin</span>
      <el-dropdown
        class="avatar-container"
        trigger="click"
        @click.native="logout"
      >
        <div class="avatar-wrapper">
          退出
          <i class="el-icon-caret-bottom" />
        </div>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 99999;
  height: 60px;
    width: 100%;
  // background-color: rgb(207, 37, 37);
  background: url(~@/assets/imgs/banner.png) no-repeat;
  padding-right: 50px;
  background-size: 100%;
  .navbar-login {
    width: 88px;
    height: 36px;
    margin-top: 10px;
    margin-left: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.navbar-user {
  display: flex;
  align-items: center;
  width: 200px;
  .navbar-userImg {
    margin-right: 20px;
  }
  span {
    white-space: nowrap;
    color: #fff;
    font-size: 16px;
    margin-right: 20px;
  }
  .avatar-container {
    margin-right: 20px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    .avatar-wrapper {
      white-space: nowrap;
    }
  }
}
</style>
