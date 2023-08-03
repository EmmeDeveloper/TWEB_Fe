<script setup>
import { ref, computed } from 'vue'
import { getCoursesRepetitions, getUserRepetitions, useStore } from '../../StateService.js'
import LessonCalendarView from '@/components/LessonCalendar/LessonCalendarView.vue'
import PastLessonReservationView from '@/components/LessonReservation/PastLessonReservationView.vue'

const state = ref(useStore())



const lessonsMap = computed(() => {
  const map = {}
  state.value.userRepetitions.forEach((repetition) => {
    const date = new Date(repetition.date)
    const key = date.toISOString().slice(0, 10) // Using toISOString() to get "YYYY-MM-DD" format
    if (!map[key]) {
      map[key] = []
    }
    map[key].push(repetition)
  })
  return map
})

const selectableDates = computed(() => {
  return lessonsMap.value
    ? Object.keys(lessonsMap.value)
    : []
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

    <LessonCalendarView
      :lessonsMap="lessonsMap"
      :selectableDates="selectableDates"
      @repetitionUpdated="repetitionUpdated"
      @selectItem="selectItem"
    />

    <div>
      <PastLessonReservationView
        v-if="selectedItem?.showPast"
        :repetition="selectedItem.repetition"
        @updatedLesson="repetitionUpdated"
      />
    </div>
  </div>
</template>
