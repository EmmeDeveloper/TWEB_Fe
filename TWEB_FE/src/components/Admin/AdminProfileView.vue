<script setup>
import './AdminProfile.css'
import Sidebar from './SidebarView.vue'
import LessonsView from './LessonsView.vue'
import { useStore, getAllProfessors, getAllCourses } from '../../StateService'
import { onBeforeMount, ref } from 'vue'

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
  <div class="w-100 h-100 d-flex">
    <div class="ms-0 row w-100">
      <div class="col-3">
        <Sidebar @updateUser="updateUser" @changePage="updatePage" />
      </div>
 
      <div class="col-9 bg-danger">

        <LessonsView v-if="state.currentPage === 'bookings'" />


      </div>
    </div>
  </div>
  
  
  <!-- <div class="flex gap-2 profile" style="height: 100%">
    
    <div>
      <table style="width: 100%">
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Cognome</th>
        </tr>
        <tr v-for="prof in state.allProfessors" :key="prof.id">
          <td>{{ prof.id }}</td>
          <td>{{ prof.name }}</td>
          <td>{{ prof.surname }}</td>
        </tr>
      </table>
    </div>
    <div>
      <table style="width: 100%">
        <tr>
          <th>Id</th>
          <th>Titolo</th>
        </tr>
        <tr v-for="course in state.courses" :key="course.id">
          <td>{{ course.id }}</td>
          <td>{{ course.title }}</td>
        </tr>
      </table>
    </div>
  </div> -->
</template>
