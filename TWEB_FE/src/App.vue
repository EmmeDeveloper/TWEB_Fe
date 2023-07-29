<script setup>
import HomeViewVue from '@/components/Home/HomeView.vue'
import Navbar from '@/components/Navbar/NavbarView.vue'
import { ref } from 'vue'
import UserProfileView from './components/UserProfile/UserProfileView.vue'

let page = ref('HOME')

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
  <HomeViewVue v-if="page === 'HOME'" />
  <UserProfileView
    v-else-if="page === 'USERPROFILE'"
    :userData="userData"
    @updateUser="updateUser"
    @changePage="updatePage"
  ></UserProfileView>
</template>

<style scoped></style>
