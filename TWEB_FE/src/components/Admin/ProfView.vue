<script setup>
import { useStore, deleteProf } from '../../StateService'
import { ref } from 'vue'
import './LessonsView.css'

const state = ref(useStore())

const titles = ['Nome', 'Cognome', '']

const actionId = ref(null)

async function _deleteProf(prof) {
  await deleteProf(prof)
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
            v-for="prof in state.allProfessors"
            :key="prof.id"
            class="align-baseline"
            @mouseover="actionId = prof.id"
            @mouseout="actionId = null"
          >
            <td>{{ prof.name }}</td>
            <td>{{ prof.surname }}</td>
            <td>
              <div>
                <button
                  type="button"
                  class="btn btn-danger py-1"
                  v-if="actionId == prof.id"
                  @click="_deleteProf(prof)"
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
