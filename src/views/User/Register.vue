<template>
  <div>
    <div class="reg-bg" :style="regBg"></div>
    <div>
      <a-row>
        <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
        <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="8"
          ><div class="reg-panel">
            <h4 class="reg-title">注册 ● 后台管理中心</h4>
            <a-form :form="form" @submit="handleSubmit">
              <a-form-item v-bind="formItemLayout" label="姓名">
                <a-input
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入您的姓名!'
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="性别">
                <a-radio-group name="sex" :defaultValue="1">
                  <a-radio :value="1">男</a-radio>
                  <a-radio :value="2">女</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="手机号">
                <a-input
                  v-decorator="[
                    'phone',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入您的手机号!'
                        },
                        {
                          validator: validNumberPhone
                        }
                      ]
                    }
                  ]"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="密码">
                <a-input
                  v-decorator="[
                    'pwd',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入您的密码!'
                        },
                        {
                          validator: validatePwd
                        },
                        {
                          validator: validateToNextPassword
                        }
                      ]
                    }
                  ]"
                  type="password"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="确认密码">
                <a-input
                  v-decorator="[
                    'confirm',
                    {
                      rules: [
                        {
                          required: true,
                          message: '再次输入您的密码!'
                        },
                        {
                          validator: compareToFirstPassword
                        }
                      ]
                    }
                  ]"
                  type="password"
                  @blur="handleConfirmBlur"
                />
              </a-form-item>
              <a-form-item v-bind="tailFormItemLayout">
                <a-button type="primary" html-type="submit">
                  注册
                </a-button>
                <a-button style="margin-left: 15px;" @click="returnLogin">
                  返回登录
                </a-button>
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
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 19, offset: 1 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      },
      regBg: {
        background: "url(" + require("../../../src/assets/login-bg.jpg") + ")"
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("pwd")) {
        callback("两次密码输入不一致!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    validatePwd(rule, value, callback) {
      const pwdVerification = /^(?!\d+$)[\da-zA-Z]{6,}$/;
      if (!pwdVerification.test(value)) {
        callback("密码必须包含字母和数字，至少六位数!");
      } else {
        callback();
      }
    },
    validNumberPhone(rule, value, callback) {
      const phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!phoneCodeVerification.test(value)) {
        callback("您输入是手机号码格式有误!");
      } else {
        callback();
      }
    },
    returnLogin() {
      this.$router.push("/user/login");
    }
  }
};
</script>

<style scoped>
.reg-bg {
  width: 100%;
  height: 100%;
  position: absolute;
}

.reg-panel {
  margin-top: 6pc;
  padding: 2pc 3pc;
  border-radius: 0.5pc;
  background-color: #ffffff8c;
}

.reg-title {
  font-size: 1.5pc;
  text-align: center;
}
</style>
