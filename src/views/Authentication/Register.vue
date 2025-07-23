<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col mt-5">
        <div class="card login-card mx-auto">
          <div class="card-body">
            <div class="mb-3">
              <text-input label="First Name" v-model="firstName" />
            </div>
            <div class="mb-3">
              <text-input label="Last Name" v-model="lastName" />
            </div>
            <div class="mb-3">
              <text-input label="Email" v-model="email" />
            </div>
            <div class="mb-3">
              <text-input label="Password" type="password" v-model="password" />
            </div>
            <h2>Store Information</h2>
            <div class="mb-3">
              <text-input label="Name" v-model="storeName" />
            </div>
            <div class="mb-3">
              <text-input label="Location" v-model="storeLocation" />
            </div>
            <button class="btn btn-secondary" @click="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { store } from "../../store";
import { useRouter } from "vue-router";
const router = useRouter()
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const storeName = ref("");
const storeLocation = ref("");
const signUp = async () => {
  try {
    const response = await store.dispatch("register", {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
      store_name: storeName.value,
      store_location: storeLocation.value,
    });
    if (response.error) {
        return
    } 
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("store", JSON.stringify(response.selected_store));
    router.push('/')
    // Redirect or show success message
  } catch (error) {
    console.error("Sign up failed:", error);
    // Handle error (e.g., show error message)
  }
};
</script>

<style lang="scss" scoped>
:deep(.form-label) {
  color: #999eab !important;
}
:deep(input) {
  height: 45px;
  background-color: transparent !important;
}
</style>
