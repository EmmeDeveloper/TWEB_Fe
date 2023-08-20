<script setup>
import { computed, ref } from 'vue'
import {
  getCoursesRepetitions,
  getUserRepetitions,
  useStore,
  updateRepetitionStatus
} from '../../StateService.js'
import { REPETITION_STATUS_DELETED } from '../../constants.js'

import './LessonsView.css'

const state = ref(useStore())

const repetitions = computed(() => state.value.allRepetitions)
const titles = ['Data', 'Orario', 'Utente', 'Professore', 'Corso', 'Stato', '']

const actionId = ref(null)

async function deleteLesson(repetition) {
  await updateRepetitionStatus(
    repetition.id,
    REPETITION_STATUS_DELETED,
    "Confermata come non effettuata dall'admin"
  ).then(() => {
    getCoursesRepetitions()
    getUserRepetitions()
  })
}
</script>

<template>
  <div class="d-flex adminTable h-100 p-2">
    <div class="table-responsive pe-1 mt-4">
      <table class="table align-top overflow-auto border">
        <thead>
          <tr>
            <th v-for="title in titles" :key="title">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="repetition in repetitions"
            :key="repetition.id"
            @mouseover="actionId = repetition.id"
            class="align-baseline"
            @mouseout="actionId = null"
          >
            <td>{{ repetition.date }}</td>
            <td>{{ repetition.time }}:00 - {{ repetition.time + 1 }}:00</td>
            <td>{{ repetition.user.name }} {{ repetition.user.surname }}</td>
            <td>{{ repetition.professor.name }} {{ repetition.professor.surname }}</td>
            <td>{{ repetition.course.title }}</td>
            <td>
              <span v-if="repetition.status === 'deleted'" class="status deleted p-1">
                Non effettuata</span
              >
              <span v-else-if="repetition.status === 'pending'" class="status pending p-1"
                >Da confermare</span
              >
              <span v-else-if="repetition.status === 'done'" class="status done p-1"
                >Effettuata</span
              >
            </td>
            <td>
              <template
                v-if="
                  repetition.status == 'pending' &&
                  new Date(repetition.date).setHours(repetition.time) < new Date()
                "
              >
                <button
                  type="button"
                  class="btn btn-danger py-1"
                  v-if="actionId == repetition.id"
                  @click="deleteLesson(repetition)"
                >
                  Non effettuata
                </button>
                <i class="mdi mdi-dots-vertical pointer px-5" v-else></i>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
