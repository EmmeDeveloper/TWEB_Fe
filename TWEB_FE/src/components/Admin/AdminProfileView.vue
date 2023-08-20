<script setup>
import './AdminProfile.css'
import Sidebar from './SidebarView.vue'
import LessonsView from './LessonsView.vue'
import TeachingsView from './TeachingsView.vue'
import CoursesView from './CoursesView.vue'
import ProfView from './ProfView.vue'
import { useStore, getAllProfessors, getAllCourses } from '../../StateService'
import { onBeforeMount, ref } from 'vue'
import {
  PAGE_ADMIN_COURSES,
  PAGE_ADMIN_PROFESSORS,
  PAGE_ADMIN_TEACHINGS,
  PAGE_ADMIN_BOOKINGS
} from '../../constants'

const emits = defineEmits(['changePage', 'updateUser'])

function updatePage(page) {
  emits('changePage', page)
}

function updateUser(u) {
  emits('updateUser', u)
}

onBeforeMount(async () => {
  await getAllProfessors()
  await getAllCourses()
})

const state = ref(useStore())
</script>

<template>
  <div class="w-100 h-100 d-flex overflow-auto">
    <div class="ms-0 row w-100 h-100">
      <div class="col-3">
        <Sidebar @updateUser="updateUser" @changePage="updatePage" />
      </div>

      <div class="col-9 h-100">
        <ProfView v-if="state.currentPage === PAGE_ADMIN_PROFESSORS" />
        <LessonsView v-if="state.currentPage === PAGE_ADMIN_BOOKINGS" />
        <TeachingsView v-if="state.currentPage === PAGE_ADMIN_TEACHINGS" />
        <CoursesView v-if="state.currentPage === PAGE_ADMIN_COURSES" />
      </div>
    </div>
  </div>
</template>
