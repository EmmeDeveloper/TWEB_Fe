
<script setup>
import { ref, computed } from 'vue';
import FutureLessonReservationView from '../LessonReservation/FutureLessonReservationView.vue';

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


const rep = {
    date: '2023-03-26',
    time: 13,
    status: 'deleted',
    note: 'Ripetizione annullata per cancellazione professore',
    professor: null,
    user: {
      birthDate: '',
      phone: '',
      memberSince: '',
      address: '',
      role: 'User',
      id: '1',
      email: 'giovanni@example.com',
      surname: 'Bianchi',
      account: 'giovanni',
      name: 'Giovanni'
    },
    course: {
      title: 'Programmazione 1',
      id: '1'
    },
    id: 'ff439e73-f69a-47b9-8713-37c02c17d4b5'
  };

const time = 13;
const date = new Date('2023-03-26');

const prof = {
  '1': [{id: '1', name: 'Giovanni', surname: 'Bianchi'}, {id: '2', name: 'Mario', surname: 'Rossi'}],
  '2': [{id: '3', name: 'Luca', surname: 'Verdi'}, {id: '4', name: 'Giuseppe', surname: 'Neri'}],
  '3': [{id: '5', name: 'Giacomo', surname: 'Gialli'}]
};

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


    <div>
      <FutureLessonReservationView :reservation="rep" :time="time" :date="date" :courseProfMap="prof" />
    </div>
  </div>
</template>