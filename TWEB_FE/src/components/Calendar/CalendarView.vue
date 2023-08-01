
<script setup>
import { ref, computed } from 'vue';
import FutureLessonReservationView from '../LessonReservation/FutureLessonReservationView.vue';
import PastLessonReservationView from '../LessonReservation/PastLessonReservationView.vue';
import { getCoursesRepetitions, getUserRepetitions, useStore } from '../../StateService.js';

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

const state = ref(useStore());

const selectedItem = ref(null);

const _time = 15;
const date = new Date();

const prof = {
  '1': [{ id: '1', name: 'Giovanni', surname: 'Bianchi' }, { id: '2', name: 'Mario', surname: 'Rossi' }],
  '2': [{ id: '3', name: 'Luca', surname: 'Verdi' }, { id: '4', name: 'Giuseppe', surname: 'Neri' }],
  '3': [{ id: '5', name: 'Giacomo', surname: 'Gialli' }]
};

function selectFreeItem(date, time = _time) {
  selectedItem.value = {
    date: date,
    time: time,
    showFuture: true
  };
}

function repetitionUpdated() {
  selectedItem.value = null;
  getCoursesRepetitions();
  getUserRepetitions();
}

function selectRepetition(repetition) {
  selectedItem.value = {
    repetition: repetition,
    showFuture: new Date(repetition.date).setHours(repetition.time) >= new Date(),
    showPast: new Date(repetition.date).setHours(repetition.time) < new Date(),
  };
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
        date: new Date(currentDay),
        day: currentDay.getDate(),
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
  <div>
    <div v-for="repetition in state.userRepetitions" :key="repetition.id" @click="selectRepetition(repetition)">
      ----------------------------------
      <div>{{ repetition.date }}</div>
      <div>{{ repetition.time }}</div>
      <div>{{ repetition.status }}</div>
      <div>{{ repetition.note }}</div>
      <div>{{ repetition.professor }}</div>
      <div>{{ repetition.user }}</div>
      <div>{{ repetition.course }}</div>
      <div>{{ repetition.id }}</div>
    </div>
  </div>

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
        <td v-for="day in week" :key="day" @click="selectFreeItem(day.date)">
          {{ day.day }}
        </td>
      </tr>
    </table>

    <div>
      Selezionato: {{ selectedItem }}

      <FutureLessonReservationView v-if="selectedItem?.showFuture"
        :repetition="selectedItem.repetition" :time="selectedItem.time" :date="selectedItem.date" :courseProfMap="prof"
        @reservedLesson="repetitionUpdated" @deletedLesson="repetitionUpdated" />

      <PastLessonReservationView v-else-if="selectedItem?.showPast"
        :repetition="selectedItem.repetition" @updatedLesson="repetitionUpdated" />
    </div>
  </div>
</template>