import { createRouter, createWebHistory } from "vue-router";

const Login = () => import("../views/Authentication/Login.vue");
const Register = () => import("../views/Authentication/Register.vue");
const ItemDashBoard = () => import("../views/Item/ItemDashboard.vue");
const ItemDetail = () => import("../views/Item/ItemDetail.vue");
const Store = () => import("../views/Store/Store.vue");
const Configuration = () => import("../views/Configuration/Configuration.vue");

function AuthGuard(to, from, next) {
  if (!localStorage.getItem("token")) {
    next({ name: "Login" });
  } else {
    next();
  }
}

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
      beforeEnter: AuthGuard,
      component: ItemDashBoard,
    },
    {
      path: "/item_detail/:id",
      beforeEnter: AuthGuard,
      component: ItemDetail,
      name: "Item Detail",
    },
    {
      path: "/store",
      beforeEnter: AuthGuard,
      name: "Store",
      component: Store,
    },
    {
      path: "/configuration",
      beforeEnter: AuthGuard,
      name: "Configuration",
      component: Configuration,
    },
  ],
});
export default router;
