<script setup>
import './LessonCard.css'

const props = defineProps({
  repetition: Object
})

function dateToString(date) {
  return new Date(date).toLocaleString('it-IT', {
    day: 'numeric',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="card" v-if="repetition">
    <p class="title">{{ props.repetition.course.title }}</p>
    <div class="flex gap-2">
      <span>{{ dateToString(props.repetition.date) }}</span>
      <span v-if="props.repetition.status === 'deleted'" class="label-status deleted">
        Non effettuata
      </span>
      <span v-else-if="props.repetition.status === 'pending'" class="label-status pending">
        Da confermare
      </span>
      <span v-else-if="props.repetition.status === 'done'" class="label-status done"
        >Effettuata</span
      >
      <span v-else class="label-status">In attesa</span>
    </div>
    <span>Ora: {{ props.repetition.time }}:00 - {{ props.repetition.time + 1 }}:00</span>
    <span v-if="props.repetition.professor">
      Prof. {{ props.repetition.professor.name }} {{ props.repetition.professor.surname }}
    </span>
  </div>
</template>

<style></style>
