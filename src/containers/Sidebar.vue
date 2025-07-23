<template>
  <div
    class="d-flex flex-row main-page-container"
    style="width: 100%; height: 100%"
  >
    <div class="side-bar">
      <div class="items d-flex flex-column">
        <div
          v-for="item in sideBarItems"
          :key="item.name"
          class="py-2 item"
          :class="{
            'active-sidebar-item': isActive(item.path),
          }"
          @click="router.push(item.path)"
        >
          <span>
            {{ item.name }}
          </span>
        </div>
        <div class="mt-auto item py-2" @click="logout">
          <span>Logout</span>
        </div>
      </div>
    </div>
    <main class="main">
      <slot name="body"></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const isActive = (path: string) => {
  if (path == "/" && route.fullPath == "/") {
    return true;
  }
  return route.fullPath.includes(path) && path !== "/";
};
const sideBarItems = ref([
  { name: "Items", path: "/" },
  { name: "Store", path: "/store" },
  { name: "Customers", path: "/configuration" },
]);
const logout = () => {
  localStorage.clear();
  router.push("/auth/login");
};
</script>

<style lang="scss" scoped>
.main-page-container {
  flex-grow: 1;
  overflow: hidden;
  .side-bar {
    height: 100vh;
    display: block;
    width: 110px;
    order: -1;
    background-color: #181d29;
    .items {
      width: 100% !important;
      height: 100% !important;
      color: white;
      text-align: center;
      .item {
        cursor: pointer;
        &:hover {
          background-color: #232740 !important;
        }
      }
    }
  }
  .main {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
}
.active-sidebar-item {
  background-color: #232740;
}
</style>
