
<script setup>
import { ref, computed } from 'vue';
import { getCoursesRepetitions, getUserRepetitions, useStore } from '../../StateService.js';
import LessonCalendarView from '../LessonCalendar/LessonCalendarView.vue';
import FutureLessonReservationView from '../LessonReservation/FutureLessonReservationView.vue';
import PastLessonReservationView from '../LessonReservation/PastLessonReservationView.vue';


const prof = {
  '1': [{ id: '1', name: 'Giovanni', surname: 'Bianchi' }, { id: '2', name: 'Mario', surname: 'Rossi' }],
  '2': [{ id: '3', name: 'Luca', surname: 'Verdi' }, { id: '4', name: 'Giuseppe', surname: 'Neri' }],
  '3': [{ id: '5', name: 'Giacomo', surname: 'Gialli' }]
};
const state = ref(useStore());

const lessonsMap = computed(() => {
  const map = {};
  state.value.allRepetitions.forEach((repetition) => {
    const date = new Date(repetition.date);
    const key = date.toISOString().slice(0, 10); // Using toISOString() to get "YYYY-MM-DD" format
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(repetition);
  });
  return map;
});

function repetitionUpdated() {
  selectedItem.value = null;
  getCoursesRepetitions();
  getUserRepetitions();
}


const selectedItem = ref(null);

function selectItem(item) {
  selectedItem.value = item;
}

</script>

<template>
<div>

  <div>
    <div v-for="repetition in state.userRepetitions" :key="repetition.id">
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

  <LessonCalendarView :lessonsMap="lessonsMap" @repetitionUpdated="repetitionUpdated" @selectItem="selectItem" />

  <div>
      <FutureLessonReservationView v-if="selectedItem?.showFuture" :repetition="selectedItem.repetition"
        :time="selectedItem.time" :date="selectedItem.date" :courseProfMap="prof" @reservedLesson="repetitionUpdated"
        @deletedLesson="repetitionUpdated" />

      <PastLessonReservationView v-else-if="selectedItem?.showPast" :repetition="selectedItem.repetition"
        @updatedLesson="repetitionUpdated" />
    </div>
</div>
</template>