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
  })
}

</script>
<template>
  <div id="app-sidebar" class="app-sidebar">
    <div class="padding-button">
      <div
        class="button"
        :class="[{ 'button-clicked': adminPage == 'PROFESSORI' }]"
        @click="showAdminPage('PROFESSORI')"
      >
        Professori
      </div>
      <div
        class="button"
        :class="[{ 'button-clicked': adminPage == 'CORSI' }]"
        @click="showAdminPage('CORSI')"
      >
        Corsi
      </div>
      <div
        class="button"
        :class="[{ 'button-clicked': adminPage == 'INSEGNAMENTI' }]"
        @click="showAdminPage('INSEGNAMENTI')"
      >
        Insegnamenti
      </div>
    </div>
    <div class="divider"></div>
    <div class="padding-button" @click="_logout">
      <div>Logout</div>
    </div>
  </div>
</template>
