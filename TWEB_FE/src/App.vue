<script setup>
import HomeViewVue from '@/components/Home/HomeView.vue'
import Navbar from '@/components/Navbar/NavbarView.vue'
import UserProfileView from '@/components/UserProfile/UserProfileView.vue'
import CalendarView from '@/components/Calendar/CalendarView.vue'
import AdminProfileView from '@/components/Admin/AdminProfileView.vue'
import MyLessonsView from '@/components/MyLessons/MyLessonsView.vue'
import LoginModalView from '@/components/Modals/LoginModalView.vue'

import {
  PAGE_CALENDAR,
  PAGE_HOME,
  PAGE_USER_ADMIN,
  PAGE_USER_PROFILE,
  PAGE_MYLESSONS,
  PAGE_ADMIN_COURSES,
  PAGE_ADMIN_PROFESSORS,
  PAGE_ADMIN_TEACHINGS,
  PAGE_ADMIN_BOOKINGS
} from '@/constants'
import {
  initStore,
  login,
  updatePage,
  updateUser,
  logout,
  getCoursesRepetitions,
  getUserRepetitions
} from '@/StateService.js'

import { ref } from 'vue'

const state = initStore()

logout().then(
  setTimeout(() => {
    login('emme', 'pass').then((u) => {
      updateUser(u)
      getCoursesRepetitions()
      getUserRepetitions()
    })
  }, 500)
)

const showModalLogin = ref(false)

// TODOS:
// Login automatico, da rimuovere
// Fare filtro materie

function isAdminPage() {
  return (
    state.value.currentPage === PAGE_USER_ADMIN ||
    state.value.currentPage === PAGE_ADMIN_COURSES ||
    state.value.currentPage === PAGE_ADMIN_PROFESSORS ||
    state.value.currentPage === PAGE_ADMIN_TEACHINGS ||
    state.value.currentPage === PAGE_ADMIN_BOOKINGS
  )
}
</script>

<template>
  <header>
    <Navbar
      :page="state.currentPage"
      @changePage="updatePage"
      :userData="state.userData"
      @updateUser="updateUser"
      @loginClicked="showModalLogin = true"
    />
  </header>
  <HomeViewVue v-if="state.currentPage === PAGE_HOME" />
  <UserProfileView
    v-else-if="state.currentPage === PAGE_USER_PROFILE"
    :userData="state.userData"
    @updateUser="updateUser"
    @changePage="updatePage"
  />
  <AdminProfileView
    v-else-if="isAdminPage()"
    :userData="state.userData"
    @updateUser="updateUser"
    @changePage="updatePage"
  />
  <CalendarView
    v-else-if="state.currentPage === PAGE_CALENDAR"
    @loginClicked="showModalLogin = true"
  />
  <MyLessonsView v-else-if="state.currentPage === PAGE_MYLESSONS" />

  <LoginModalView
    v-if="showModalLogin"
    @close="showModalLogin = false"
    :user="user"
    @updateUser="updateUser"
  >
  </LoginModalView>
</template>

<style scoped></style>
