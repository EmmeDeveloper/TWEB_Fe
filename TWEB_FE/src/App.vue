<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar/NavbarView.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>

  <RouterView />
</template>

<style scoped></style>
