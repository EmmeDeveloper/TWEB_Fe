<script setup>
import { useStore, deleteCourse } from '../../StateService'
import { COURSE_DELETED, COURSE_NOT_DELETED } from '../../constants'
import { ref } from 'vue'
import ToastView from '../Toast/ToastView.vue'

const state = ref(useStore())
const actionId = ref(null)

const titles = ['Titolo', '']

const showToast = ref(false)
const objectToast = ref({ text: null, color: null })

async function _deleteCourse(course) {
  const status = await deleteCourse(course.id)
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
            v-for="course in state.courses"
            :key="course.id"
            @mouseover="actionId = course.id"
            class="align-baseline"
            @mouseout="actionId = null"
          >
            <td>{{ course.title }}</td>
            <td>
              <div>
                <button
                  type="button"
                  class="btn btn-danger py-1"
                  v-if="actionId == course.id"
                  @click="_deleteCourse(course)"
                >
                  <i class="mdi mdi-trash-can-outline"></i>
                </button>
                <i class="mdi mdi-dots-vertical pointer px-5" v-else></i>
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
</template>
