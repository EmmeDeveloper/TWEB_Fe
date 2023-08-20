<script setup>
import { computed } from 'vue'
import './Navbar.css'
import { PAGE_CALENDAR, PAGE_HOME, PAGE_MYLESSONS, PAGE_USER_ADMIN, PAGE_USER_PROFILE } from '../../constants'

const props = defineProps({ page: String, userData: Object })
const emits = defineEmits(['changePage', 'loginClicked'])

const user = computed(() => props.userData) // Use computed to make it reactive to props.userData changes

const changePage = (p) => {
  emits('changePage', p)
}

function loginClicked() {
  emits('loginClicked')
}

const pages = computed(() => [
  { icon: 'home', name: 'Home', page: PAGE_HOME, condition: true },
  { icon: 'format-list-bulleted', name: 'Le mie lezioni', page: PAGE_MYLESSONS, condition: user.value != null && user.value.role != 'Admin' },
  { icon: 'calendar-blank', name: 'Calendario', page: PAGE_CALENDAR, condition: true },
]);
</script>

<template>
  <nav class="align-center border-bottom d-flex justify-content-between px-3 w-100">
    <div class="d-flex gap-4 ps-3">
      <template v-for="p in pages" :key="p.page">
        <div v-if="p.condition" class="align-center d-flex gap-2 pointer p-2"
          :class="{ 'current-page': p.page == props.page }" @click="changePage(p.page)">
          <i class="mdi fs-4" :class="'mdi-' + p.icon"></i>
          <span class="fs-7">{{ p.name }}</span>
        </div>
      </template>

    </div>
    <div class="d-flex align-center">
      <div v-if="user == null" class="align-center border-primary border border-2 d-flex px-1 py-1 rounded-pill pointer"
        @click="loginClicked">
        <div class="d-flex justify-content-center align-items-center bg-primary rounded-circle"
          style="width: 2rem; height: 2rem;">
          <i class="fs-4 mdi mdi-account text-white"></i>
        </div>
        <span class="fw-bold c-primary px-3 fs-7">ACCEDI</span>
      </div>
      <div v-else class="flex align-center">
        <div class="d-flex gap-2 pointer align-center px-2" @click="changePage(user.role == 'Admin' ? PAGE_USER_ADMIN : PAGE_USER_PROFILE)">
          <span class="fs-7">Ciao, {{ user.name }}</span>
          <img src="@/assets/person-circle.svg" alt="profilo utente" class="rounded-circle" style="width: 2rem; height: 2rem;" />
        </div>
      </div>
    </div>
  </nav>
</template>

<style></style>
