<template>
  <div>
    <div class="login-bg" :style="loginBg"></div>
    <div>
      <a-row>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
        <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8"
          ><div class="login-panel">
            <h4 class="login-title">登录 ● 后台管理中心</h4>
            <a-form
              id="components-form-demo-normal-login"
              :form="form"
              class="login-form"
              @submit="handleSubmit"
            >
              <a-form-item>
                <a-input
                  v-decorator="[
                    'username',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入你的用户名!'
                        }
                      ]
                    }
                  ]"
                  placeholder="用户名"
                >
                  <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input
                  v-decorator="[
                    'password',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入你的密码!'
                        }
                      ]
                    }
                  ]"
                  type="password"
                  placeholder="密码"
                >
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                  />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-checkbox
                  v-decorator="[
                    'remember',
                    {
                      valuePropName: 'checked',
                      initialValue: true
                    }
                  ]"
                >
                  记住我
                </a-checkbox>
                <a class="login-form-forgot" href="javascript:void(0)">
                  忘记密码
                </a>
                <a-button
                  type="primary"
                  html-type="submit"
                  class="login-form-button"
                >
                  登 录
                </a-button>
                Or
                <a href="/user/register">
                  立即注册!
                </a>
              </a-form-item>
            </a-form>
          </div></a-col
        >
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginBg: {
        background: "url(" + require("../../../src/assets/login-bg.jpg") + ")"
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    }
  }
};
</script>

<style scoped>
.login-bg {
  width: 100%;
  height: 100%;
  position: absolute;
}

.login-panel {
  margin-top: 9pc;
  padding: 2pc 3pc;
  border-radius: 0.5pc;
  background-color: #ffffff8c;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

.login-title {
  font-size: 1.5pc;
  text-align: center;
}
</style>
