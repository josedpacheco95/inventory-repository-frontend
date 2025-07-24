import { createRouter, createWebHistory } from "vue-router";

const Login = () => import("../views/Authentication/Login.vue");
const Register = () => import("../views/Authentication/Register.vue");
const ItemDashBoard = () => import("../views/Item/ItemDashboard.vue");
const ItemDetail = () => import("../views/Item/ItemDetail.vue");
const Store = () => import("../views/Store/Store.vue");
const Configuration = () => import("../views/Configuration/Configuration.vue");
export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "open active",
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/auth",
      children: [
        {
          path: "login",
          component: Login,
          name: "Login",
        },
        {
          path: "signup",
          component: Register,
          name: "Register",
        },
      ],
    },
    {
      path: "/",
      name: "Items",
      component: ItemDashBoard,
    },
    { 
      path: "/item_detail/:id", 
      component: ItemDetail, 
      name: "Item Detail" },
    {
      path: "/store",
      name: "Store",
      component: Store,
    },
    {
      path: "/configuration",
      name: "Configuration",
      component: Configuration,
    },
  ],
});
export default router;
