<template>
  <div id="app">
    <!-- Hiển thị Navbar nếu người dùng đã đăng nhập -->
    <Navbar v-if="auth.user" />

    <!-- Router view cho các trang -->
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import { useAuthStore } from './store/auth'

const auth = useAuthStore()
</script>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  background-color: #f8f9fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
