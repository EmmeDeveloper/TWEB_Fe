<script setup>
import { ref, computed } from 'vue'
import { getCoursesRepetitions, getUserRepetitions, useStore } from '../../StateService.js'
import LessonCalendarView from '@/components/LessonCalendar/LessonCalendarView.vue'
import FutureLessonReservationView from '@/components/LessonReservation/FutureLessonReservationView.vue'
import PastLessonReservationView from '@/components/LessonReservation/PastLessonReservationView.vue'

const prof = {
  1: [
    { id: '1', name: 'Giovanni', surname: 'Bianchi' },
    { id: '2', name: 'Mario', surname: 'Rossi' }
  ],
  2: [
    { id: '3', name: 'Luca', surname: 'Verdi' },
    { id: '4', name: 'Giuseppe', surname: 'Neri' }
  ],
  3: [{ id: '5', name: 'Giacomo', surname: 'Gialli' }]
}
const state = ref(useStore())

const lessonsMap = computed(() => {
  const map = {}
  state.value.allRepetitions.forEach((repetition) => {
    const date = new Date(repetition.date)
    const key = date.toISOString().slice(0, 10) // Using toISOString() to get "YYYY-MM-DD" format
    if (!map[key]) {
      map[key] = []
    }
    map[key].push(repetition)
  })
  return map
});

const myLessonsMap = computed(() => {
  const mymap = {}
  state.value.userRepetitions.forEach((repetition) => {
    const date = new Date(repetition.date)
    const key = date.toISOString().slice(0, 10) // Using toISOString() to get "YYYY-MM-DD" format
    if (!mymap[key]) {
      mymap[key] = []
    }
    mymap[key].push(repetition)
  })
  return mymap
});

function repetitionUpdated() {
  selectedItem.value = null
  getCoursesRepetitions()
  getUserRepetitions()
}

const selectedItem = ref(null)

function selectItem(item) {
  selectedItem.value = item
}
</script>

<template>
  <div class="w100">

    <div class="row p24">
      <div class="column column-70">
        <LessonCalendarView :lessonsMap="lessonsMap" :myLessonsMap="myLessonsMap" :adminView="state.isAdmin"
          @repetitionUpdated="repetitionUpdated" @selectItem="selectItem" />
      </div>

      <div>
        <FutureLessonReservationView v-if="selectedItem?.showFuture" :repetition="selectedItem.repetition"
          :time="selectedItem.time" :date="selectedItem.date" :courseProfMap="prof" @reservedLesson="repetitionUpdated"
          @deletedLesson="repetitionUpdated" />

        <PastLessonReservationView v-else-if="selectedItem?.showPast" :repetition="selectedItem.repetition"
          @updatedLesson="repetitionUpdated" />
      </div>
    </div>
  </div>
</template>
