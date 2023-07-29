<script setup>
import LoginModalView from '@/components/Modals/LoginModalView.vue'
import { ref } from 'vue'
import './Navbar.css'

const props = defineProps({ page: String, userData: Object })
const emits = defineEmits(['changePage', 'updateUser'])

const showModalLogin = ref(false)
const user = ref(props.userData)

const updateNavbarUser = (u) => {
  user.value = u
  emits('updateUser', u)
}
</script>

<template>
  <nav>
    <div>
      <a class="primary-text pointer">Home</a>
      <a class="primary-text pointer">?</a>
      <a class="primary-text pointer">?</a>
    </div>
    <div>
      <button
        v-if="user == null"
        class="primary-button cursor-pointer"
        @click="showModalLogin = true"
      >
        Accedi
      </button>
      <div v-else class="flex gap-1 align-center">
        <button
          class="flex gap-1 pointer primary-button"
          @click="emits('changePage', 'USERPROFILE')"
        >
          <p>Ciao {{ user.account }}</p>
          <img src="@/assets/person-circle.svg" alt="profilo utente" />
        </button>
      </div>
    </div>
    <LoginModalView
      v-if="showModalLogin"
      @close="showModalLogin = false"
      :user="user"
      @updateUser="updateNavbarUser"
    ></LoginModalView>
  </nav>
</template>

<style></style>
