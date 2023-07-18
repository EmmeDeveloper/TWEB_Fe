<script setup>
import { RouterLink } from 'vue-router'

let showModalLogin = false
let showModalSignUp = false
</script>

<template>
  <nav>
    <div>
      <RouterLink to="/" class="primary-text">Home</RouterLink>
      <RouterLink to="/" class="primary-text">?</RouterLink>
      <RouterLink to="/" class="primary-text">?</RouterLink>
      <RouterLink to="/" class="primary-text">?</RouterLink>
    </div>
    <div>
      <button class="primary-button cursor-pointer" @click="showModalLogin = true">Accedi</button>
      <button class="primary-button cursor-pointer" @click="showModalSignUp = true">
        Iscriviti
      </button>
    </div>
    <login-modal v-if="showModalLogin" @close="showModalLogin = false"></login-modal>
  </nav>
</template>

<style>
nav {
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  border-bottom: 3px solid var(--PRIMARY-COLOR);
  padding: 1rem 0.8rem;
  align-items: center;
}

nav > div {
  position: relative;
  display: flex;
  gap: 3rem;
}
</style>
