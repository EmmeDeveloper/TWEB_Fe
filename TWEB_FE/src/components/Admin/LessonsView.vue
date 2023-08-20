<script setup>

import { computed, ref } from 'vue'
import { useStore } from '../../StateService.js'

import './LessonsView.css'

const state = ref(useStore())

const repetitions = computed(() => state.value.allRepetitions);
const titles = ['Data', 'Orario', 'Utente', 'Professore', 'Corso', 'Stato', '']
</script>

<template>
  <div class="d-flex lessons h-100 p-2">
    <div class="table-responsive pe-1 mt-4">
      <table class="table align-top overflow-auto border">
        <thead>
          <tr>
            <th v-for="title in titles" :key="title">{{ title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repetition in repetitions" :key="repetition.id">
            <td>{{ repetition.date }}</td>
            <td>{{ repetition.time }}:00 - {{ repetition.time + 1 }}:00</td>
            <td>{{ repetition.user.name }} {{ repetition.user.surname }}</td>
            <td>{{ repetition.professor.name }} {{ repetition.professor.surname }}</td>
            <td>{{ repetition.course.title }}</td>
            <td>
              <span v-if="repetition.status === 'deleted'" class="status deleted p-1"> Non effettuata</span>
              <span v-else-if="repetition.status === 'pending'" class="status pending p-1">Da confermare</span>
              <span v-else-if="repetition.status === 'done'" class="status done p-1">Effettuata</span>
            </td>
            <td>
              <i class="mdi mdi-dots-vertical" v-if="repetition.status == 'pending'"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>