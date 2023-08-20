<script setup>
import './LessonCalendarView.css'
import { ref, computed } from 'vue'
import TimeCardView from '@/components/LessonCalendar/TimeCardView.vue'

const props = defineProps({
  lessonsMap: Object, // All lessons from all users
  selectableDates: Array,
  myLessonsMap: Object,
  adminView: Boolean
})

const lessonsMap = computed(() => {
  return props.lessonsMap
})

const myLessonsMap = computed(() => {
  return props.myLessonsMap
})

const emits = defineEmits(['repetitionUpdated', 'selectItem'])

const currentDate = ref(new Date())

const displayMonth = computed(() => {
  return currentDate.value.toLocaleString('it-IT', { month: 'long', year: 'numeric' })
})

const daysOfWeek = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']

function prevMonth() {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() - 1))
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + 1))
}

function selectFreeItem(date, time) {
  emits('selectItem', {
    date: date,
    time: parseInt(time),
    showFuture: true
  })
}

function selectRepetition(repetition) {
  emits('selectItem', {
    repetition: repetition,
    showFuture: new Date(repetition.date).setHours(repetition.time) >= new Date(),
    showPast: new Date(repetition.date).setHours(repetition.time) < new Date()
  })
}

function selectRepetitions(repetitions, date, time) {
  emits('selectItem', {
    repetitions: repetitions,
    date: date,
    time: parseInt(time)
  })
}

const today = new Date()

function isToday(date) {
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

const weeks = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startDate = new Date(firstDayOfMonth)
  const dayOfWeek = startDate.getDay()

  // Adjust the start date depending on the day of the week to show calendar properly
  if (dayOfWeek !== 1) {
    startDate.setDate(startDate.getDate() - dayOfWeek + 1)
  }
  const endDate = new Date(lastDayOfMonth)
  endDate.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()))

  // Create map for lessons in the month
  const weeks = []
  let currentDay = new Date(startDate)

  while (currentDay <= endDate) {
    const week = []
    for (let i = 0; i < 7; i++) {
      const defaultLessons = { 14: null, 15: null, 16: null, 17: null }
      const dayItem = {
        date: new Date(currentDay),
        day: currentDay.getDate(),
        isCurrentMonth: currentDay.getMonth() === month,
        showFreeItems:
          (currentDay > new Date() || isToday(currentDay)) &&
          currentDay.getDay() !== 0 &&
          currentDay.getDay() !== 6 &&
          props.selectableDates == null
      }
      dayItem.date.setHours(8)

      const key = dayItem.date.toISOString().slice(0, 10)

      // Add user lessons to the map
      var myLessons = { ...defaultLessons }
      var allLessons = { ...defaultLessons }

      if (myLessonsMap.value[key]) {
        myLessons = myLessonsMap.value[key].reduce(
          (acc, repetition) => {
            acc[repetition.time] = repetition
            return acc
          },
          { ...defaultLessons }
        )
      }

      // Add lessons from other users to the map (used for free items and admin)
      if (lessonsMap.value[key]) {
        allLessons = lessonsMap.value[key].reduce(
          (allAcc, repetition) => {
            if (!Array.isArray(allAcc[repetition.time])) {
              allAcc[repetition.time] = []
            }
            allAcc[repetition.time] = [repetition, ...allAcc[repetition.time]]
            return allAcc
          },
          { ...defaultLessons }
        )
      }

      const mergedLessons = []
      Object.keys(defaultLessons).forEach((time) => {
        const myRepetition = myLessons[time]
        const allRepetitions = allLessons[time]

        if (myRepetition) {
          mergedLessons.push({
            time: time,
            repetition: myRepetition
          })
        } else {
          mergedLessons.push({
            time: time,
            repetitions: allRepetitions
          })
        }
      })

      dayItem.lessons = mergedLessons
      week.push(dayItem)
      currentDay.setDate(currentDay.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
})
</script>

<template>
  <div class="container h-100">
    <div class="row justify-center h-100">
      <div class="col-12 h-100">
        <div class="container text-center mt-5">
          <div class="flex justify-content-center align-items-center mb-3">
            <button
              class="btn btn-primary"
              @click="prevMonth"
              :disabled="
                props.selectableDates == null &&
                currentDate.getMonth() <= today.getMonth() &&
                currentDate.getFullYear() <= today.getFullYear()
              "
            >
              &lt;
            </button>
            <h3 class="mb-0 mt-0 mx-5 text-capitalize">{{ displayMonth }}</h3>
            <button class="btn btn-primary" @click="nextMonth">&gt;</button>
          </div>
        </div>
        <div class="calendar">
          <table class="table align-top table-bordered">
            <thead>
              <tr>
                <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="week in weeks" :key="week">
                <td
                  v-for="day in week"
                  :key="day.date"
                  :class="{ 'current-month': day.isCurrentMonth, today: isToday(day.date) }"
                >
                  <div class="day">
                    <span>{{ day.day }}</span>
                    <div v-if="day.isCurrentMonth">
                      <div v-for="lesson in day.lessons" :key="lesson.time" class="lesson">
                        <TimeCardView
                          :time="lesson.time"
                          :adminView="props.adminView"
                          :repetition="lesson.repetition"
                          :showFreeItems="day.showFreeItems"
                          :repetitions="lesson.repetitions"
                          @selectMultipleRepetitions="
                            selectRepetitions(lesson.repetitions, day.date, lesson.time)
                          "
                          @selectFreeItem="selectFreeItem(day.date, lesson.time)"
                          @selectRepetition="selectRepetition(lesson.repetition)"
                        >
                        </TimeCardView>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
