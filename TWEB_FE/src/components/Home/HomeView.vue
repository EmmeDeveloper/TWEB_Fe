<script setup>
import { BACKEND_LINK } from '../../environment.js'
import { onBeforeMount, ref } from 'vue'
import './Home.css'
import LessonCard from '@/components/LessonCard/LessonCardView.vue'

let courses = ref([])

async function getAllCoursesService() {
  try {
    return (await fetch(`${BACKEND_LINK}/courses`)).json()
  } catch (error) {
    console.log(error)
  }
}

onBeforeMount(async () => {
  try {
    courses.value = (await getAllCoursesService()).courses
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="home-text-image">
    <div class="text-box">
      <p class="home-title">Trova l'insegnante ideale</p>
      <p class="home-subtitle">Lezioni online o in presenza!</p>
    </div>
    <img src="../../assets/home-image.png" class="home-image" alt="home image" />
  </div>
  <article class="article-courses">
    <p stile="margin-bottom:30px;">Un professore per ogni materia</p>
    <div class="flex flex-row gap-2">
      <LessonCard v-for="course in courses" :title="course.title" :key="course.id"></LessonCard>
    </div>
  </article>
</template>
