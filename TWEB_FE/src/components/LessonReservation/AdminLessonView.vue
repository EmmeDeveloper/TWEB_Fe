<script setup>
import { computed } from 'vue'
import LessonReservationDetails from './LessonReservationDetails.vue'
import './LessonReservationView.css'

const props = defineProps({
  repetitions: Array,
  time: Number,
  date: Date
})

const emits = defineEmits(['close'])

const uiData = computed(() => {
  const lessons = {}
  props.repetitions.forEach((repetition) => {
    if (!lessons[repetition.course.title]) {
      lessons[repetition.course.title] = []
    }
    lessons[repetition.course.title].push({
      prof: repetition.professor.name + ' ' + repetition.professor.surname,
      user: repetition.user.name + ' ' + repetition.user.surname
    })
  })

  return {
    title: 'Lezioni prenotate',
    time: props.time,
    date: props.date,
    lessons: lessons
  }
})

function close() {
  emits('close')
}
</script>

<template>
  <div>
    <div class="d-flex flex-row-reverse mt-2">
      <i class="mdi mdi-close fs-4 px-1 pointer" @click="close()"></i>
    </div>
    <LessonReservationDetails
      :title="uiData.title"
      :time="uiData.time"
      :date="uiData.date"
      :course="uiData.course"
      :professor="uiData.professor"
    />

    <div v-for="(users, subject) in uiData.lessons" :key="subject" class="mt-2">
      <div v-if="users.length != 0" class="d-flex flex-column">
        <span class="fw-bold my-2 px-2 fs-5">{{ subject }}</span>

        <div
          class="align-center d-flex justify-content-between"
          v-for="people in users"
          :key="people"
        >
          <div class="align-center d-flex w-100">
            <i class="mdi mdi-human-male-board px-2 fs-4" style="line-height: 1.2"></i>
            <span class="fs-5">{{ people.prof }}</span>
          </div>
          <div class="align-center d-flex w-100">
            <i class="mdi mdi-account px-2 fs-4" style="line-height: 1.2"></i>
            <span class="fs-5">{{ people.user }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
