<script setup>
import HomeViewVue from '@/components/Home/HomeView.vue'
import Navbar from '@/components/Navbar/NavbarView.vue'
import UserProfileView from './components/UserProfile/UserProfileView.vue'
import CalendarView from './components/Calendar/CalendarView.vue'
import { PAGE_CALENDAR, PAGE_HOME, PAGE_USER_PROFILE } from './constants'
import { initStore, login, updatePage, updateUser, logout, getCoursesRepetitions, getUserRepetitions } from './StateService.js'

const state = initStore()

// TODO: Login automatico, da rimuovere
logout().then(
  setTimeout(() => {
    login('giovanni', 'pass').then((u) => {
      updateUser(u)
        getCoursesRepetitions();
        getUserRepetitions();
    })
  }, 500)
)

</script>

<template>
  {{ state.userData }}
  <header>
    <Navbar :page="state.currentPage" @changePage="updatePage" :userData="state.userData" @updateUser="updateUser" />
  </header>
  <HomeViewVue v-if="state.currentPage === PAGE_HOME" />
  <UserProfileView v-else-if="state.currentPage === PAGE_USER_PROFILE" :userData="state.userData" @updateUser="updateUser"
    @changePage="updatePage" />
  <CalendarView v-else-if="state.currentPage === PAGE_CALENDAR" />
</template>

<style scoped></style>
