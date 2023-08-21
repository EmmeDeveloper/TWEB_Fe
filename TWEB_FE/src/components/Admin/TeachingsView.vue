<script setup>
import { useStore, deleteTeachings } from '../../StateService'
import { onBeforeMount, ref } from 'vue'
import './LessonsView.css'

const state = ref(useStore())

const titles = ['Corso', 'Professore', '']

const allTeachings = ref([])

const actionId = ref(null)

onBeforeMount(() => {
  for (let course of state.value.courses) {
    if (state.value.teachings[course.id] == undefined) continue

    for (let prof of state.value.teachings[course.id]) {
      allTeachings.value.push({
        course: course,
        professor: prof
      })
    }
  }
})

async function _deleteTeachings(teaching) {
  const result = await deleteTeachings(teaching)
  if (result != 200) return

  allTeachings.value = allTeachings.value.filter((t) => t.professor.id != teaching.professor.id)
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
            v-for="(teaching, index) in allTeachings"
            :key="index"
            class="align-baseline"
            @mouseover="actionId = index"
            @mouseout="actionId = null"
          >
            <td>{{ teaching.course.title }}</td>
            <td>{{ teaching.professor.name }} {{ teaching.professor.surname }}</td>
            <td>
              <div>
                <button
                  type="button"
                  class="btn btn-danger py-1"
                  v-if="actionId == index"
                  @click="_deleteTeachings(teaching)"
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
</template>
