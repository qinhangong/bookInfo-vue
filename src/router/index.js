import App from "@/components/App";
import Admin from "@/components/Admin";

export default {
  routes: [
    {
      path: "/",
      component: App
    },
    {
      path: "/admin",
      component: Admin
    }
  ]
};
