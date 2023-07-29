<script setup>
import './LessonCard.css'
const props = defineProps({
  repetition: Object
})

function dateToString(date) {
  return new Date(date).toLocaleDateString()
}
</script>

<template>
  <div class="card" v-if="repetition">
    <!-- TODO AGGIUNGERE TITOLO -->
    <p class="title">Analisi 1</p>
    <div class="flex gap-2">
      <p>{{ dateToString(props.repetition.date) }}</p>
      <p>{{ props.repetition.status }}</p>
    </div>
    <p>Ora: {{ props.repetition.time }}:00 - {{ props.repetition.time + 1 }}:00</p>

    <p v-if="props.repetition.professor">
      Prof. {{ props.repetition.professor.name }} {{ props.repetition.professor.surname }}
    </p>
  </div>
</template>

<style></style>
