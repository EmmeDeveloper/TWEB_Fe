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
  <div v-if="repetition" class="d-flex flex-column rounded-4 p-3 border" style="min-width: 18rem">
    <div class="flex gap-2 flex-row-reverse mb-2">
      <span v-if="props.repetition.status === 'deleted'" class="repetition-status deleted px-2">
        Non effettuata
      </span>
      <span v-else-if="props.repetition.status === 'pending'" class="repetition-status pending px-2">
        Da confermare
      </span>
      <span v-else-if="props.repetition.status === 'done'" class="repetition-status done px-2">Effettuata</span>
      <span v-else class="repetition-status">In attesa</span>
    </div>

    <div class="d-flex flex-column ps-1 pe-4">
      <span class="fs-4 mb-2">{{ props.repetition.course.title }}</span>
      <span>{{ dateToString(props.repetition.date) }}</span>
      <span>Ora: {{ props.repetition.time }}:00 - {{ props.repetition.time + 1 }}:00</span>
      <span v-if="props.repetition.professor">
        Prof. {{ props.repetition.professor?.name || "Professore eliminato" }} {{ props.repetition.professor.surname }}
      </span>
    </div>
  </div>
</template>
