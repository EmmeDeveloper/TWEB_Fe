<script setup>
import LoginModalView from '@/components/Modals/LoginModalView.vue'
import { ref } from 'vue'
import './Navbar.css'
import { PAGE_CALENDAR, PAGE_HOME, PAGE_USER_PROFILE } from '../../constants';



const props = defineProps({ page: String, userData: Object })
const emits = defineEmits(['changePage', 'updateUser'])

const showModalLogin = ref(false)
const user = ref(props.userData)

const updateNavbarUser = (u) => {
  user.value = u
  emits('updateUser', u)
}

const changePage = (p) => {
  emits('changePage', p)
}

</script>

<template>
  <nav>
    <div>
      <a class="primary-text pointer" @click="changePage(PAGE_HOME)">Home</a>
      <a class="primary-text pointer">?</a>
      <a class="primary-text pointer" @click="changePage(PAGE_CALENDAR)">Caledario</a>
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
          @click="changePage(PAGE_USER_PROFILE)"
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