<script setup>
import { useStore, deleteCourse } from '@/StateService'
import { COURSE_DELETED, COURSE_NOT_DELETED, DELETE_COURSE_TEXT, MODAL_TITLE } from '@/constants'
import { ref } from 'vue'
import ToastView from '@/components/Toast/ToastView.vue'
import ConfirmModalView from '@/components/Modals/ConfirmModalView.vue'

const state = ref(useStore())
const actionId = ref(null)
const courseToDelete = ref(null)

const titles = ['Titolo', '']

const showToast = ref(false)
const objectToast = ref({ text: null, color: null })

const showModal = ref(false)
const objectConfirmModal = ref({ text: DELETE_COURSE_TEXT, title: MODAL_TITLE })

async function _deleteCourse() {
  const status = await deleteCourse(courseToDelete.value)
  if (status === 200) {
    objectToast.value.text = COURSE_DELETED
    objectToast.value.color = 'var(--DONE-COLOR-TOAST)'
  } else {
    objectToast.value.text = COURSE_NOT_DELETED
    objectToast.value.color = 'var(--ERROR-COLOR-TOAST)'
  }

  showToast.value = true
}

function closeToast() {
  showToast.value = false
}

function _ok() {
  showModal.value = false
  _deleteCourse()
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
          <tr v-for="course in state.courses" :key="course.id" @mouseover="actionId = course.id" class="align-baseline"
            @mouseout="actionId = null">
            <td>{{ course.title }}</td>
            <td>
              <div>
                <button type="button" class="btn fs-4 py-0 pointer" @click="() => {
                    showModal = true
                    courseToDelete = course.id
                  }
                  ">
                  <i class="mdi mdi-trash-can-outline"></i>
                </button>
              </div>
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
    <ConfirmModalView :objectConfirmModal="objectConfirmModal" @close="showModal = false" @ok="_ok()"></ConfirmModalView>
  </div>
</template>
