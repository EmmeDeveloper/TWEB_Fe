<script setup>
import { ref } from 'vue'
import { getCoursesRepetitions, logout, useStore } from '../../StateService.js'
import {
  PAGE_HOME,
  PAGE_ADMIN_COURSES,
  PAGE_ADMIN_PROFESSORS,
  PAGE_ADMIN_TEACHINGS,
  PAGE_ADMIN_BOOKINGS
} from '../../constants'

const state = ref(useStore())

const emits = defineEmits(['changePage', 'updateUser'])

function showAdminPage(page) {
  emits('changePage', page)
}

function _logout() {
  logout().then(() => {
    getCoursesRepetitions()
    emits('changePage', PAGE_HOME)
    emits('updateUser', null)
  })
}

const sections = [
  { name: 'Professori', icon: 'human-male-board', page: PAGE_ADMIN_PROFESSORS },
  { name: 'Corsi', icon: 'text-long', page: PAGE_ADMIN_COURSES },
  { name: 'Insegnamenti', icon: 'alpha-i-circle', page: PAGE_ADMIN_TEACHINGS },
  { name: 'Lezioni', icon: 'format-list-bulleted', page: PAGE_ADMIN_BOOKINGS }
]
</script>

<template>
  <div
    class="d-flex flex-row px-3 overflow-x-auto flex-xl-column justify-content-xl-evenly align-items-center w-100 py-2"
    style="background-color: var(--PRIMARY-COLOR); margin: 0.5rem; border-radius: 15px;"
  >
    <div class="d-flex flex-row flex-xl-column gap-2 gap-xl-0 w-100">
      <div
        v-for="section in sections"
        :key="section"
        @click="showAdminPage(section.page)"
        class="d-flex align-center pointer px-2 py-1 gap-2 fs-7 ml-2"
        :class="{
          'selected-item': state.currentPage == section.page,
          'not-selected-item': state.currentPage != section.page
        }"
      >
        <i class="mdi fs-4" :class="'mdi-' + section.icon"></i>
        <span class="d-none d-md-block">{{ section.name }}</span>
      </div>
    </div>
    <div class="align-items-center justify-content-center gap-2 d-flex " @click="_logout">
      <i class="mdi mdi-logout-variant fs-4 pointer" style="color: rgba(255, 255, 255, 0.8)"></i>
      <button class="logout-button">Logout</button>
    </div>
  </div>
</template>
