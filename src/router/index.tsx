import { createRouter, createWebHistory } from "vue-router";

const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");
const ItemDashBoard = () => import("@/views/ItemDashBoard.vue");
const ItemDetail = () => import("@/views/ItemDetail.vue");
const Store = () => import("@/views/Store.vue");

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
      children: [
        { path: "item/:id", component: ItemDetail, name: "Item Detail" },
      ],
    },
    {
      path: "/store",
      name: "Store",
      component: Store,
    },
  ],
});
export default router;
