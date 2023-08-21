<script setup>
import { ref, watch } from 'vue'
import { getCoursesRepetitions, getUserRepetitions, useStore } from '../../StateService.js'
import LessonCalendarView from '@/components/LessonCalendar/LessonCalendarView.vue'
import FutureLessonReservationView from '@/components/LessonReservation/FutureLessonReservationView.vue'
import PastLessonReservationView from '@/components/LessonReservation/PastLessonReservationView.vue'
import AdminLessonView from '@/components/LessonReservation/AdminLessonView.vue'
import './CalendarView.css'

const state = ref(useStore())

const emits = defineEmits(['loginClicked'])

const lessonsMap = ref({});
const myLessonsMap = ref({});

updateLessonsMap();
updateMyLessonsMap();

watch([() => state.value.allRepetitions, () => state.value.userRepetitions, () => state.value.filteredProfessors], ([newRep, newURep, newProf], [oldRep, oldURep, oldProf]) => {
  if (newRep != oldRep || newURep != oldURep || newProf != oldProf) {
    updateLessonsMap();
    updateMyLessonsMap();
  }
});

function updateLessonsMap() {
  const map = {}
  state.value.allRepetitions.forEach((repetition) => {
    const date = new Date(repetition.date)
    const key = date.toISOString().slice(0, 10) // Using toISOString() to get "YYYY-MM-DD" format
    if (!map[key]) {
      map[key] = []
    }
    if (repetition.professor && state.value.filteredProfessors.find(p => p.id == repetition.professor.id) != null) {
      map[key].push(repetition)
    }
  })
  lessonsMap.value = map
}

function updateMyLessonsMap() {
  const mymap = {}
  state.value.userRepetitions.forEach((repetition) => {
    const date = new Date(repetition.date)
    const key = date.toISOString().slice(0, 10) // Using toISOString() to get "YYYY-MM-DD" format
    if (!mymap[key]) {
      mymap[key] = []
    }
    if (repetition.professor && state.value.filteredProfessors.find(p => p.id == repetition.professor.id) != null) {
      mymap[key].push(repetition)
    }
  })
  myLessonsMap.value = mymap
}

function repetitionUpdated() {
  getCoursesRepetitions()
  getUserRepetitions()
}

function closeSidebar() {
  selectedItem.value = null
}

const selectedItem = ref(null)

function selectItem(item) {
  selectedItem.value = item
}

function getAvailableProf(time, date) {
  const profs = { ...state.value.filteredTeachings };
  if (!time || !date || !lessonsMap.value[date.toISOString().slice(0, 10)]) {
    return profs;
  }
  const busy = lessonsMap.value[date.toISOString().slice(0, 10)]
    .filter((repetition) => repetition.time === time)
    .map((repetition) => repetition.professor?.id);

  Object.keys(profs).forEach((courseId) => {
    profs[courseId] = profs[courseId].filter((prof) => !busy.includes(prof.id));
    if (profs[courseId].length === 0) {
      delete profs[courseId];
    }
  });

  return profs;
}

function loginClicked() {
  emits('loginClicked')
}

</script>

<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div :class="[selectedItem ? 'col-9' : 'col-12']">
        <LessonCalendarView :lessonsMap="lessonsMap" :myLessonsMap="myLessonsMap" :adminView="state.isAdmin"
          @repetitionUpdated="repetitionUpdated" @selectItem="selectItem" />

      </div>

      <div :class="{ 'col-3 border-start border-1': selectedItem }">
        <template v-if="selectedItem?.repetitions">
          <AdminLessonView :repetitions="selectedItem.repetitions" :time="selectedItem.time" :date="selectedItem.date"
            @close="closeSidebar()" />
        </template>
        <template v-else>
          <FutureLessonReservationView v-if="selectedItem?.showFuture" :repetition="selectedItem.repetition"
            :time="selectedItem.time" :date="selectedItem.date"
            :courseProfMap="getAvailableProf(selectedItem?.time, selectedItem?.date)" @reservedLesson="repetitionUpdated"
            @deletedLesson="repetitionUpdated" @close="closeSidebar()" @loginClicked="loginClicked()" />

          <PastLessonReservationView v-else-if="selectedItem?.showPast" :repetition="selectedItem.repetition"
            @updatedLesson="repetitionUpdated" @close="closeSidebar()" />
        </template>
      </div>
    </div>
  </div>
</template>
