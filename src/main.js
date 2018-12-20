// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import routes from "./router";
import Router from "vue-router";
import { MessageBox, Message } from "element-ui";

Vue.use(Router);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router: new Router(routes),
  render: h =>
    h(
      "keep-alive",
      {
        props: {
          include: "Calculator"
        }
      },
      [h("router-view")]
    )
});
