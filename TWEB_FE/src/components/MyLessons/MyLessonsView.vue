<script setup>
import { ref, computed } from 'vue'
import { getCoursesRepetitions, getUserRepetitions, useStore } from '../../StateService.js'
import LessonCalendarView from '@/components/LessonCalendar/LessonCalendarView.vue'
import PastLessonReservationView from '@/components/LessonReservation/PastLessonReservationView.vue'
import FutureLessonReservationView from '@/components/LessonReservation/FutureLessonReservationView.vue'

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
  getCoursesRepetitions()
  getUserRepetitions()
}

const selectedItem = ref(null)

function selectItem(item) {
  selectedItem.value = item
}

function closeSidebar() {
  selectedItem.value = null
}

</script>

<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div :class="[selectedItem ? 'col-9' : 'col-12']">
        <LessonCalendarView :myLessonsMap="lessonsMap" :lessonsMap="{}" :selectableDates="selectableDates"
          @repetitionUpdated="repetitionUpdated" @selectItem="selectItem" />
      </div>
      <div :class="{'col-3 border-start border-1' : selectedItem}">
        <FutureLessonReservationView v-if="selectedItem?.showFuture" :repetition="selectedItem.repetition"
                                     :time="selectedItem.time" :date="selectedItem.date" :courseProfMap="prof" @reservedLesson="repetitionUpdated"
                                     @deletedLesson="repetitionUpdated" @close="closeSidebar()" />

        <PastLessonReservationView v-if="selectedItem?.showPast" :repetition="selectedItem.repetition" @close="closeSidebar()" 
          @updatedLesson="repetitionUpdated" />
      </div>
    </div>
  </div>
</template>
