<script setup>
import { useStore } from '../../StateService'
import { ref } from 'vue'
import './LessonsView.css'

const state = ref(useStore())

const titles = ['Nome', 'Cognome']
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
          <tr v-for="prof in state.allProfessors" :key="prof.id" class="align-baseline">
            <td>{{ prof.name }}</td>
            <td>{{ prof.surname }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
