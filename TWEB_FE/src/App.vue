<script setup>
import HomeViewVue from '@/components/Home/HomeView.vue'
import Navbar from '@/components/Navbar/NavbarView.vue'
import UserProfileView from './components/UserProfile/UserProfileView.vue'
import CalendarView from './components/Calendar/CalendarView.vue';
import { PAGE_CALENDAR, PAGE_HOME, PAGE_USER_PROFILE } from './constants';
import { initStore, login, updatePage, updateUser } from './StateService.vue';
import { useCookies } from "vue3-cookies";


const state = initStore();

// TODO: Login automatico, da rimuovere
login('giovanni','pass').then(u => {
  updateUser(u);
});
const { cookies } = useCookies();


</script>

<template>
  {{ cookies.keys() || "ciao" }}
  {{ state.userData }}
  <header>
    <Navbar :page="state.currentPage" @changePage="updatePage" :userData="state.userData" @updateUser="updateUser" />
  </header>
  <HomeViewVue v-if="state.currentPage === PAGE_HOME" />
  <UserProfileView v-else-if="state.currentPage === PAGE_USER_PROFILE"
    :userData="state.userData"
    @updateUser="updateUser"
    @changePage="updatePage" />
  <CalendarView v-else-if="state.currentPage === PAGE_CALENDAR" />
  
</template>

<style scoped></style>
