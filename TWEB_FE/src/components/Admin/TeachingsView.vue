<script setup>
import { useStore } from '../../StateService'
import { onBeforeMount, ref, computed } from 'vue'
import './LessonsView.css'

const state = ref(useStore())

const titles = ['Corso', 'Professore']

const allTeachings = computed(() => [])

onBeforeMount(() => {
  for (let course of state.value.courses) {
    for (let prof of state.value.teachings[course.id]) {
      allTeachings.value.push({
        course: course,
        professor: prof
      })
    }
  }
})
</script>

<template>
  <div class="d-flex adminTable h-100 p-2">
    <div class="table-responsive pe-1 mt-4">
      <table class="table align-top overflow-auto border">
        <thead>
          <tr>
            <th v-for="title in titles" :key="title">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(teaching, index) in allTeachings" :key="index" class="align-baseline">
            <td>{{ teaching.course.title }}</td>
            <td>{{ teaching.professor.name }} {{ teaching.professor.surname }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
