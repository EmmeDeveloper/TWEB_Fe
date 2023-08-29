<script setup>
import { onBeforeMount } from 'vue'
import './Home.css'
import LessonCard from '@/components/LessonCard/LessonCardView.vue'
import { useStore, getAllCourses, getTeachings, getAllProfessors } from '../../StateService.js'

const state = useStore()

onBeforeMount(async () => {
  await getAllCourses();
  await getAllProfessors();
  await getTeachings();
})

const info = [
  {
    title: 'Il tempo è nelle tue mani',
    caption: "Benvenuto in Project30, l'app che ti mette al comando del tuo percorso accademico. Non perdere più tempo a cercare manualmente gli orari delle lezioni o a coordinarti con i tuoi compagni di corso.",
    icon: "mdi mdi-clock-time-four-outline",
    color: "#009688"
  },
  {
    title: 'Pianifica, Prenota, Eccelli',
    caption: "Organizza il tuo orario in base alle tue preferenze, prenota lezioni con i professori più stimati e sincronizza tutto con il tuo calendario. Mai più sovrapposizioni o confusione. ",
    icon: "mdi mdi-calendar-clock",
    color: "#fa2118"
  },
  {
   title: "Meno effort, più tecnologia",
    caption: "Con pochi tocchi, puoi creare il tuo programma perfetto e ricevere notifiche utili per ricordarti le tue lezioni. Unisciti a noi e scopri come semplificare la tua vita universitaria, mettendo il controllo nelle tue mani.",
    icon: "mdi mdi-robot",
    color: "#ff9800"
  }
]
</script>

<template>
  <div class="d-flex flex-column overflow-y-auto overflow-x-hidden">

    <div class="w-100 mt-5 d-flex justify-content-center align-center px-4"
      style="height:40rem;background: rgba(170,170,0,0.1); gap: 12rem;">
      <div class="d-flex flex-column" style="max-width: 42rem;">
        <span class="text-secondary fs-5">Entra a fare parte della community.</span>
        <span class="my-2" style="font-size: 3.5rem;line-height: 1.2;font-weight: 700;">La prima soluzione all-in-one per
          la gestione delle tue lezioni!</span>
        <span class="fs-3">Trova il tuo insegnante ideale, organizza le tue lezioni e impara con noi</span>
      </div>
      <img src="../../assets/home_image.png" class="home-image d-lg-block d-none" alt="home image" />
    </div>

    <div class="align-items-center align-items-md-baseline d-flex flex-column flex-md-row flex-row gap-4 justify-content-center mb-5 mt-5 px-4">
      <div v-for="capt in info" :key="capt.title" class="d-flex flex-column border mt-3 p-3 rounded-4" style="max-width: 24rem;">
        <div style="width: 5rem; height: 5rem;" :style="{ backgroundColor: capt.color }" class="align-center justify-content-center d-flex rounded-4 mb-3" >
          <i :class="capt.icon" style="font-size: 3rem; color: white;" ></i>
        </div>
        <span class="fs-3 mb-2">{{ capt.title }}</span>
        <div :style="{ backgroundColor: capt.color }" style="height: 0.2rem; width: 5rem;" class="my-1"></div>
        <span class="fs-5 text-secondary">{{ capt.caption }}</span>
      </div>
    </div>
  </div>
</template>
