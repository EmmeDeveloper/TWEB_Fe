<script setup>
import { RouterLink } from 'vue-router'
import LoginModalView from '../Modals/LoginModalView.vue'
import { ref } from 'vue'
import { BACKEND_LINK } from '../../environment'

const showModalLogin = ref(false)

const userData = ref(null)

async function logout() {
  try {
    var requestOptions = {
      method: 'POST',
      body: new URLSearchParams(),
      redirect: 'follow'
    }
    const result = await fetch(`${BACKEND_LINK}/logout`, requestOptions)
    if (result.status == 200) userData.value = null
    else console.log('error')
  } catch (error) {
    console.log(error)
  }
}
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
      <button
        v-if="userData == null"
        class="primary-button cursor-pointer"
        @click="showModalLogin = true"
      >
        Accedi
      </button>
      <div v-else class="flex gap-1 align-center">
        <div>Ciao {{ userData.account }}</div>
        <button class="delete-button cursor-pointer" @click="logout()">Logout</button>
      </div>
    </div>

    <LoginModalView
      v-if="showModalLogin"
      @close="showModalLogin = false"
      v-model="userData"
    ></LoginModalView>
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
