<script setup>
import { useStore, deleteTeachings } from '@/StateService'
import { onBeforeMount, ref } from 'vue'
import './LessonsView.css'
import {
  TEACHING_DELETED,
  TEACHING_NOT_DELETED,
  MODAL_TITLE,
  DELETE_TEACHING_TEXT
} from '@/constants'
import ToastView from '@/components/Toast/ToastView.vue'
import ConfirmModalView from '@/components/Modals/ConfirmModalView.vue'
import NewTeachingModalView from '@/components/Modals/NewTeachingModalView.vue'

const state = ref(useStore())

const titles = ['Corso', 'Professore', '']

const allTeachings = ref([])

const teachingToDelete = ref(null)

const showToast = ref(false)
const objectToast = ref({ text: null, color: null })

const showModal = ref(false)
const objectConfirmModal = ref({ text: DELETE_TEACHING_TEXT, title: MODAL_TITLE })

const showTeachingModal = ref(false)

const updateAllTeachings = () => {
  allTeachings.value = []

  for (let course of state.value.courses) {
    if (state.value.teachings[course.id] == undefined) continue

    state.value.teachings[course.id].map((prof) => {
      allTeachings.value.push({
        id: course.title + prof.name + prof.surname,
        course: course,
        professor: prof
      })
    })
  }
}

onBeforeMount(() => {
  updateAllTeachings()
})

async function _deleteTeachings() {
  const status = await deleteTeachings(teachingToDelete.value)
  if (status === 200) {
    objectToast.value.text = TEACHING_DELETED
    objectToast.value.color = 'var(--DONE-COLOR-TOAST)'
    allTeachings.value = allTeachings.value.filter((t) => t.id != teachingToDelete.value.id)
  } else {
    objectToast.value.text = TEACHING_NOT_DELETED
    objectToast.value.color = 'var(--ERROR-COLOR-TOAST)'
  }
  showToast.value = true
}

function closeToast() {
  showToast.value = false
}

function _ok() {
  showModal.value = false
  _deleteTeachings()
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
          <tr v-for="teaching in allTeachings" :key="teaching.id" class="align-baseline">
            <td>{{ teaching.course.title }}</td>
            <td>{{ teaching.professor?.name }} {{ teaching.professor.surname }}</td>
            <td>
              <div>
                <button
                  type="button"
                  class="btn py-0"
                  @click="
                    () => {
                      showModal = true
                      teachingToDelete = teaching
                    }
                  "
                >
                  <i class="mdi mdi-trash-can-outline fs-4 py-0 pointer"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="position: fixed; right: 2rem; bottom: 2rem">
      <button class="button-add" @click="showTeachingModal = true">
        <i class="mdi mdi-plus fs-4"></i>aggiungi insegnamento
      </button>
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
  <NewTeachingModalView
    @closeTeachingModal="
      () => {
        showTeachingModal = false
        updateAllTeachings()
      }
    "
    v-if="showTeachingModal"
  />
</template>
