<script setup>
import { useStore } from '../../StateService'
import { ref } from 'vue'

const state = ref(useStore())

const titles = ['Titolo']
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
          <tr v-for="course in state.courses" :key="course.id">
            <td>{{ course.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
