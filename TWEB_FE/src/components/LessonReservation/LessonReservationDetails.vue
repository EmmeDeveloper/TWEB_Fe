<template>
  {{ props }}

  <div :style="{ width: '100%', padding: '0 16px' }">
    <h2 v-if="props.title" style="font-weight: bold; font-size: 20px; padding: 16px 0">
      {{ props.title }}
    </h2>

    <div style="display: flex; align-items: center; padding-top: 8px">
      <i class="mdi mdi-calendar-blank" style="padding-right: 8px"></i>
      <span style="font-size: 16px">
        {{ formatDate(props.date) }}
      </span>
    </div>

    <div style="display: flex; align-items: center; padding-top: 8px">
      <i class="mdi mdi-clock-time-five-outline" style="padding-right: 8px"></i>
      <span style="font-size: 16px"> {{ props.time }}:00 - {{ parseInt(time) + 1 }}:00 </span>
    </div>

    <div v-if="props.course" style="display: flex; align-items: center; padding-top: 8px">
      <i class="mdi mdi-clipboard-list" style="padding-right: 8px"></i>
      <span style="font-size: 16px">
        {{ props.course.title }}
      </span>
    </div>

    <div v-if="props.professor" style="display: flex; align-items: center; padding-top: 8px">
      <i class="mdi mdi-account-multiple" style="padding-right: 8px"></i>
      <span style="font-size: 16px">
        {{ props.professor.name }} {{ props.professor.surname }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  time: Number,
  date: Date,
  course: String,
  professor: Object
})

function formatDate(date) {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('it-IT', options)
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
}
</script>
