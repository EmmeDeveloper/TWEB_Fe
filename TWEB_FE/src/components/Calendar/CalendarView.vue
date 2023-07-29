
<script setup>
import { ref, computed } from 'vue';

const currentDate = ref(new Date());

const displayMonth = computed(() => {
  return currentDate.value.toLocaleString('it-IT', { month: 'long', year: 'numeric' });
});

const daysOfWeek = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

function prevMonth() {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() - 1));
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + 1));
}

function isToday(day) {
  const today = new Date();
  return day.isCurrentMonth && day.date === today.getDate();
}


const weeks = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  const dayOfWeek = startDate.getDay();

  if (dayOfWeek !== 1) {
    startDate.setDate(startDate.getDate() - dayOfWeek + 1);
  }

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  const weeks = [];
  let currentDay = new Date(startDate);

  while (currentDay <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push({
        date: currentDay.getDate(),
        isCurrentMonth: currentDay.getMonth() === month,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
});
</script>

<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">&lt;</button>
      <h2>{{ displayMonth }}</h2>
      <h2>{{ currentDate }}</h2>
      <button @click="nextMonth">&gt;</button>
    </div>
    <table>
      <tr>
        <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
      </tr>
      <tr v-for="week in weeks" :key="week">
        <td v-for="day in week" :key="day.date">
          {{ day.date }}
        </td>
      </tr>
    </table>
  </div>
</template>