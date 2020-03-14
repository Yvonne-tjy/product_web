import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  Button,
  Layout,
  Icon,
  Menu,
  Dropdown,
  Row,
  Col,
  Form,
  Input,
  Checkbox,
  Tooltip,
  Cascader,
  Select,
  AutoComplete,
  Radio
} from "ant-design-vue";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(Dropdown);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Tooltip);
Vue.use(Cascader);
Vue.use(Select);
Vue.use(AutoComplete);
Vue.use(Radio);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
