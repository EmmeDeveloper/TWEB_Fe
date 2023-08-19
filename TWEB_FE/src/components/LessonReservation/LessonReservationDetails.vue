<template>
  <!--{{ props }}-->

  <div class="container d-flex flex-column">
    <h3 v-if="uiData.title">
      {{ uiData.title }}
    </h3>

    <div class="d-inline-flex align-center">
      <i class="mdi mdi-calendar-blank fs-4 px-1"></i>
      <span class="fs-5"> {{ formatDate(uiData.date) }} </span>
    </div>

    <div class="d-inline-flex align-center">
      <i class="mdi mdi-clock-time-five-outline fs-4 px-1"></i>
      <span class="fs-5"> {{ uiData.time }}:00 - {{ parseInt(uiData.time) + 1 }}:00 </span>
    </div>

    <div v-if="uiData.course" class="d-inline-flex align-center">
      <i class="mdi mdi-sort-variant fs-4  px-1"></i>
      <span class="fs-5"> {{ uiData.course.title }} </span>
    </div>

    <div v-if="uiData.professor" class="d-inline-flex align-center">
      <i class="mdi mdi-account-multiple fs-4 px-1"></i>
      <span class="fs-5">
        {{ uiData.professor.name }} {{ uiData.professor.surname }}
      </span>
    </div>

    <div v-if="uiData.note" class="d-inline-flex align-center">
      <i class="mdi mdi-file-document fs-4 px-1"></i>
      <span class="fs-5">
        {{ uiData.note }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  title: String,
  time: Number,
  date: Date,
  course: Object,
  professor: Object,
  note: String,
})

const uiData = computed(() => {
  return {
    title: props.title,
    time: props.time,
    date: props.date,
    course: props.course,
    professor: props.professor,
    note: props.note,
  }
});

function formatDate(date) {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('it-IT', options)
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
}
</script>
