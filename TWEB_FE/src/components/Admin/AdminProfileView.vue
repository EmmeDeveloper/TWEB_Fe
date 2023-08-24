<script setup>
import './AdminProfile.css'
import Sidebar from '@/components/Admin/SidebarView.vue'
import LessonsView from '@/components/Admin/LessonsView.vue'
import TeachingsView from '@/components/Admin/TeachingsView.vue'
import CoursesView from '@/components/Admin/CoursesView.vue'
import ProfView from '@/components/Admin/ProfView.vue'
import { useStore, getAllProfessors, getAllCourses } from '@/StateService'
import { onBeforeMount, ref } from 'vue'
import {
  PAGE_ADMIN_COURSES,
  PAGE_ADMIN_PROFESSORS,
  PAGE_ADMIN_TEACHINGS,
  PAGE_ADMIN_BOOKINGS
} from '@/constants'

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
  state.value.currentPage = PAGE_ADMIN_PROFESSORS
})

const state = ref(useStore())
</script>

<template>
  <div class="w-100 h-100 d-flex overflow-auto">
    <div class="d-flex flex-column ms-0 w-100 h-100 flex-xl-row">
      <div class="col-12 col-xl-2">
        <Sidebar @updateUser="updateUser" @changePage="updatePage" />
      </div>

      <div class="col-12 h-100 col-xl-10">
        <ProfView v-if="state.currentPage === PAGE_ADMIN_PROFESSORS" />
        <LessonsView v-if="state.currentPage === PAGE_ADMIN_BOOKINGS" />
        <TeachingsView v-if="state.currentPage === PAGE_ADMIN_TEACHINGS" />
        <CoursesView v-if="state.currentPage === PAGE_ADMIN_COURSES" />
      </div>
    </div>
  </div>
</template>
