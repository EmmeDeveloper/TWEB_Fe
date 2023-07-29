<script setup>
import HomeViewVue from '@/components/Home/HomeView.vue'
import Navbar from '@/components/Navbar/NavbarView.vue'
import { ref } from 'vue'
import UserProfileView from './components/UserProfile/UserProfileView.vue'
import CalendarView from './components/Calendar/CalendarView.vue';
import { PAGE_CALENDAR, PAGE_HOME, PAGE_USER_PROFILE } from './constants';

let page = ref(PAGE_HOME)

const userData = ref({
  id: '1',
  role: 'User',
  email: 'giovanni@example.com',
  account: 'giovanni'
})

const updatePage = (p) => {
  page.value = p
}

const updateUser = (p) => {
  console.log(p)
  userData.value = p
}
</script>

<template>
  <header>
    <Navbar :page="page" @changePage="updatePage" :userData="userData" @updateUser="updateUser" />
  </header>
  <HomeViewVue v-if="page === PAGE_HOME" />
  <UserProfileView v-else-if="page === PAGE_USER_PROFILE"
    :userData="userData"
    @updateUser="updateUser"
    @changePage="updatePage" />
  <CalendarView v-else-if="page === PAGE_CALENDAR" />
  
</template>

<style scoped></style>
