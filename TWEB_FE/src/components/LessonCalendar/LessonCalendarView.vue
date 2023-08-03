<script setup>

import { ref, computed } from 'vue';

const props = defineProps({
  lessonsMap: Object,
  selectableDates: Array,
})

const lessonsMap = computed(() => {
  return props.lessonsMap;
});

const emits = defineEmits(['repetitionUpdated', 'selectItem']);

const currentDate = ref(new Date());

const displayMonth = computed(() => {
  return currentDate.value.toLocaleString('it-IT', { month: 'long', year: 'numeric' });
});

const daysOfWeek = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

const _time = 15;

function prevMonth() {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() - 1));
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + 1));
}

function selectFreeItem(date, time = _time) {
  emits('selectItem', {
    date: date,
    time: time,
    showFuture: true
  });
}

function selectRepetition(repetition) {
  emits('selectItem', {
    repetition: repetition,
    showFuture: new Date(repetition.date).setHours(repetition.time) >= new Date(),
    showPast: new Date(repetition.date).setHours(repetition.time) < new Date(),
  });
}

const today = new Date();


function isToday(date) {
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

const weeks = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  const dayOfWeek = startDate.getDay();

  // Adjust the start date depending on the day of the week to show calendar properly
  if (dayOfWeek !== 1) {
    startDate.setDate(startDate.getDate() - dayOfWeek + 1);
  }
  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));


  // Create map for lessons in the month
  const weeks = [];
  let currentDay = new Date(startDate);

  while (currentDay <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {

      const defaultLessons = { 14: null, 15: null, 16: null, 17: null };
      const dayItem = {
        date: new Date(currentDay),
        day: currentDay.getDate(),
        isCurrentMonth: currentDay.getMonth() === month,
        lessons: defaultLessons,
        showFreeItems: (currentDay > new Date() || isToday(currentDay)) && currentDay.getDay() !== 0 && currentDay.getDay() !== 6 && props.selectableDates == null 
      };
      dayItem.date.setHours(8);

      const key = dayItem.date.toISOString().slice(0, 10);

      if (lessonsMap.value[key]) {
        dayItem.lessons = lessonsMap.value[key].reduce((acc, repetition) => {
          acc[repetition.time] = repetition;
          return acc;
        }, defaultLessons);
      }

      // Convert lessons object to array for easier rendering
      dayItem.lessons = Object.entries(dayItem.lessons).map(([time, repetition]) => {
        return {
          time: time,
          repetition: repetition,
        };
      });

      week.push(dayItem)
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
});
</script>

<template>
  {{ lessonsMap }}

  <div class="calendar">
    <div class="header">
      <button @click="prevMonth"
        :disabled="props.selectableDates == null && currentDate.getMonth() <= today.getMonth()">&lt;</button>
      <h2>{{ displayMonth }}</h2>
      <h2>{{ firstDayOfMonth }}</h2>
      <button @click="nextMonth">&gt;</button>
    </div>
    <table>
      <tr>
        <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
      </tr>
      <tr v-for="week in weeks" :key="week">
        <td v-for="day in week" :key="day">
          {{ day.day }}

          <div v-for="lesson in day.lessons" :key="lesson.time">
            <template v-if="day.isCurrentMonth">
              <template v-if="lesson.repetition != null">
                <div @click="selectRepetition(lesson.repetition)">
                  {{ lesson.repetition.course.title }}
                </div>
              </template>
              <template v-else-if="day.showFreeItems">
                <div @click="selectFreeItem(day.date, lesson.time)">{{ lesson.time }} Disponibile</div>
              </template>
            </template>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>