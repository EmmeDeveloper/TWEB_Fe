<script setup>
import { RouterLink } from 'vue-router'
import LoginModalView from '../Modals/LoginModalView.vue'
import { ref } from 'vue'

const showModalLogin = ref(false)
let showModalSignUp = ref(false)
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

    <LoginModalView v-if="showModalLogin" @close="showModalLogin = false"></LoginModalView>
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
