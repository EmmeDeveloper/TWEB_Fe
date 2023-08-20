<script setup>
import { ref } from 'vue'
import { getCoursesRepetitions, logout } from '../../StateService.js'
import { PAGE_HOME } from '../../constants'

let adminPage = ref(null)

const emits = defineEmits(['changePage', 'updateUser'])

function showAdminPage(page) {
  adminPage.value = page
}

function _logout() {
  logout().then(() => {
    getCoursesRepetitions()
    emits('changePage', PAGE_HOME)
    emits('updateUser', null)
  });
}

const sections = [
  { name: "Professori", icon: 'human-male-board', page: 'professors' },
  { name: "Corsi", icon: 'account-multiple', page: 'courses' },
  { name: "Insegnamenti", icon: 'account-multiple', page: 'teachings' },
  { name: "Lezioni", icon: 'format-list-bulleted', page: 'bookings' }
]
</script>
"
<template>
  <div class="d-flex flex-column h-100 px-3">
    <div v-for="section in sections" :key="section" @click="showAdminPage(section.page)" class="d-flex align-center pointer px-2 py-1 mt-2"
      :class="{ selected: adminPage == section.page }">
      <i class="mdi" :class="'mdi-' + section.icon"></i>
      <span>{{ section.name }}</span>
    </div>
    <div class="divider"></div>
    <div class="padding-button" @click="_logout">
      <div>Logout</div>
    </div>
  </div>
</template>
 