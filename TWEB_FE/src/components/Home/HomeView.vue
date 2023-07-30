<script setup>
import { onBeforeMount } from 'vue'
import './Home.css'
import LessonCard from '@/components/LessonCard/LessonCardView.vue'
import { useStore, getAllCourses } from '../../StateService.vue'

const state = useStore();

onBeforeMount(async () => {
  await getAllCourses();
})
</script>

<template>
  <div class="home-text-image">
    <div class="text-box">
      <p class="home-title">Trova l'insegnante ideale</p>
      <p class="home-subtitle">Lezioni online o in presenza!</p>
    </div>
    <img src="../../assets/home_image.png" class="home-image" alt="home image" />
  </div>
  <article class="article-courses">
    <p stile="margin-bottom:30px;">Un professore per ogni materia</p>
    <div class="flex flex-row gap-2">
      <LessonCard v-for="course in state.courses" :title="course.title" :key="course.id"></LessonCard>
    </div>
    {{ state.courses }}
  </article>
</template>
