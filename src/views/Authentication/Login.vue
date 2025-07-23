<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col mt-5">
        <div class="card login-card mx-auto">
          <div class="card-body">
            <div class="mb-3">
              <text-input label="Email" v-model="email" />
            </div>
            <div class="mb-3">
              <text-input label="Password" type="password" v-model="pasword" />
            </div>
            <button class="btn btn-secondary" @click="login">Login</button>
            <p>
              Don't have an account?
              <router-link to="/auth/signup">Register</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { store } from '../../store';
const email = ref('')
const pasword = ref('')

const login = async() => {
    const response = await store.dispatch('login', {
        email: email.value,
        password: pasword.value
    });
    
}
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
