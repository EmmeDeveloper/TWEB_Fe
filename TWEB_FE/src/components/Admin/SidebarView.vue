<script setup>
import { ref } from 'vue'
let adminPage = ref(null)

function showAdminPage(page) {
  adminPage.value = page
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
    <div class="padding-button">
      <div>Logout</div>
    </div>
  </div>
</template>
