<script setup>
import LoginModalView from '@/components/Modals/LoginModalView.vue'
import { ref, computed } from 'vue'
import './Navbar.css'
import { PAGE_CALENDAR, PAGE_HOME, PAGE_MYLESSONS, PAGE_USER_ADMIN, PAGE_USER_PROFILE } from '../../constants'

const props = defineProps({ page: String, userData: Object })
const emits = defineEmits(['changePage', 'updateUser'])

const showModalLogin = ref(false)
const user = computed(() => props.userData) // Use computed to make it reactive to props.userData changes

const updateNavbarUser = (u) => {
  emits('updateUser', u)
}

const changePage = (p) => {
  emits('changePage', p)
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link pointer text-primary text-decoration-underline" @click="changePage(PAGE_HOME)">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link pointer text-primary text-decoration-underline" @click="changePage(PAGE_MYLESSONS)">Le mie lezioni</a>
          </li>
          <li class="nav-item">
            <a class="nav-link pointer text-primary text-decoration-underline" @click="changePage(PAGE_CALENDAR)">Calendario</a>
          </li>
        </ul>
        <button
            v-if="user == null"
            class="btn btn-primary"
            @click="showModalLogin = true"
        >
          Accedi
        </button>
          <button class="btn btn-outline-success" type="submit">Search</button>
      </div>
    </div>
  </nav>
  <nav>
    <div>
      <a class="primary-text pointer" @click="changePage(PAGE_HOME)">Home</a>
      <a class="primary-text pointer" @click="changePage(PAGE_MYLESSONS)">Le mie lezioni</a>
      <a class="primary-text pointer" @click="changePage(PAGE_CALENDAR)">Calendario</a>
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
          @click="changePage(user.role == 'Admin' ? PAGE_USER_ADMIN : PAGE_USER_PROFILE)"
        >
          <p>Ciao {{ user.name }}</p>
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
