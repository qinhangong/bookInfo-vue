// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router";
import Router from "vue-router";
import { MessageBox, Message } from "element-ui";

Vue.use(Router);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  el: "#app",
  router: new Router(router),
  render: h => h("router-view")
});
