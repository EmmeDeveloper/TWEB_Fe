<template>
  <div :style="{ width: '100%', padding: '0 16px' }">
    <h2 v-if="props.title" style="font-weight: bold; font-size: 20px; padding: 16px 0;">
      {{ props.title }}
    </h2>

    <div style="display: flex; align-items: center; padding-top: 8px;">
      <i class="mdi mdi-calendar-today" style="padding-right: 8px;"></i>
      <span style="font-size: 16px;">
        {{ formatDate(props.date) }}
      </span>
    </div>

    <div style="display: flex; align-items: center; padding-top: 8px;">
      <i class="mdi mdi-access-time" style="padding-right: 8px;"></i>
      <span style="font-size: 16px;">
        {{ formatTime(props.time) }}
      </span>
    </div>

    <div v-if="props.subject" style="display: flex; align-items: center; padding-top: 8px;">
      <i class="mdi mdi-subject" style="padding-right: 8px;"></i>
      <span style="font-size: 16px;">
        {{ props.subject }}
      </span>
    </div>

    <div v-if="props.professor" style="display: flex; align-items: center; padding-top: 8px;">
      <i class="mdi mdi-people" style="padding-right: 8px;"></i>
      <span style="font-size: 16px;">
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
  subject: String,
  professor: Object,
});

function formatDate(date) {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('it-IT', options);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};
function formatTime(time) {
  return `${time}:00 - ${time + 1}:00`;
};
</script>