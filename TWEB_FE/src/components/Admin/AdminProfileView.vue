<script setup>
import './AdminProfile.css'
import Sidebar from './SidebarView.vue'
import { useStore, getAllProfessors, getAllCourses } from '../../StateService'
import { onBeforeMount } from 'vue'

onBeforeMount(async () => {
  await getAllProfessors()
  await getAllCourses()
})

const state = useStore()
</script>

<template>
  <div class="flex gap-2" style="height: 100%">
    <Sidebar></Sidebar>
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
  </div>
</template>
