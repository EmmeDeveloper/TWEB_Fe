<script setup>
import { computed, ref } from 'vue'
import {
  getCoursesRepetitions,
  getUserRepetitions,
  useStore,
  updateRepetitionStatus
} from '@/StateService.js'
import {
  REPETITION_STATUS_DELETED,
  LESSON_DELETED,
  LESSON_NOT_DELETED,
  MODAL_TITLE,
  DELETE_LESSON_TEXT
} from '@/constants.js'
import './LessonsView.css'
import ToastView from '@/components/Toast/ToastView.vue'
import ConfirmModalView from '@/components/Modals/ConfirmModalView.vue'

const state = ref(useStore())

const repetitions = computed(() => state.value.allRepetitions)
const titles = ['Data', 'Orario', 'Utente', 'Professore', 'Corso', 'Stato', '']

const lessonToDelete = ref(null)

const showToast = ref(false)
const objectToast = ref({ text: null, color: null })

const showModal = ref(false)
const objectConfirmModal = ref({ text: DELETE_LESSON_TEXT, title: MODAL_TITLE })

async function deleteLesson() {
  await updateRepetitionStatus(
    lessonToDelete.value.id,
    REPETITION_STATUS_DELETED,
    "Confermata come non effettuata dall'admin"
  ).then(() => {
    getCoursesRepetitions()
    getUserRepetitions()
    objectToast.value.text = LESSON_DELETED
    objectToast.value.color = 'var(--DONE-COLOR-TOAST)'
  }).catch(() => {
    objectToast.value.text = LESSON_NOT_DELETED
    objectToast.value.color = 'var(--ERROR-COLOR-TOAST)'
  })
  showToast.value = true
}

function closeToast() {
  showToast.value = false
}

function _ok() {
  showModal.value = false
  deleteLesson()
}
</script>

<template>
  <div class="d-flex admin-table p-2">
    <div class="pe-1 my-3">
      <table class="table admin table-responsive align-top overflow-auto border">
        <thead class="table-header-display">
          <tr>
            <th v-for="title in titles" :key="title">{{ title }}</th>
          </tr>
        </thead>
        <tbody className="table-body-display">
          <tr
            v-for="repetition in repetitions"
            :key="repetition.id"
            class="align-baseline tr-table"
          >
            <td>
              <span class="d-xl-none">Data: </span>
              {{ repetition.date }}
            </td>
            <td>
              <span class="d-xl-none">Ora: </span>{{ repetition.time }}:00 -
              {{ repetition.time + 1 }}:00
            </td>
            <td>
              <span class="d-xl-none">Utente: </span>{{ repetition.user.name }}
              {{ repetition.user.surname }}
            </td>
            <td>
              <span class="d-xl-none">Professore: </span>
              {{ repetition.professor?.name || 'Professore eliminato' }}
              {{ repetition.professor?.surname || '' }}
            </td>
            <td><span>Corso: </span>{{ repetition.course?.title }}</td>
            <td>
              <span class="d-xl-none">Stato: </span>
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
            <td class="py-0">
              <i
                v-if="
                  repetition.status == 'pending' &&
                  new Date(repetition.date).setHours(repetition.time) < new Date()
                "
                class="mdi mdi-list-status fs-4 py-0 pointer"
                @click="
                  () => {
                    lessonToDelete = repetition
                    showModal = true
                  }
                "
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="showToast">
    <ToastView :showToast="showToast" @close="closeToast()" :objectToast="objectToast"></ToastView>
  </div>
  <div v-if="showModal">
    <ConfirmModalView
      :objectConfirmModal="objectConfirmModal"
      @close="showModal = false"
      @ok="_ok()"
    ></ConfirmModalView>
  </div>
</template>
