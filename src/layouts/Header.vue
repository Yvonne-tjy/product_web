<template>
  <div class="header">
    <a-dropdown>
      <a-button size="small" icon="global">国际化</a-button>
      <a-menu slot="overlay">
        <a-menu-item>
          中文
        </a-menu-item>
        <a-menu-item>
          English
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    |
    <a-button type="primary" size="small" ghost @click="goLogin">登录</a-button>
    |
    <a-button type="danger" size="small" ghost>退出</a-button>
  </div>
</template>

<script>
export default {
  methods: {
    goLogin() {
      this.$router.push("/user");
    }
  }
};
</script>

<style scoped>
.header {
  float: right;
  margin-right: 30px;
}
</style>
