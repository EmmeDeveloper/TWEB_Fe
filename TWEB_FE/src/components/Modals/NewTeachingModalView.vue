<script setup>
import { ref } from 'vue'
import { addNewTeaching, useStore } from '@/StateService.js'
const state = ref(useStore())

const emits = defineEmits(['closeTeachingModal'])

let profId = ref('-1')
let courseId = ref('-1')

async function _addNewTeaching() {
  await addNewTeaching(profId.value, courseId.value)
  emits('closeTeachingModal')
}
</script>

<template>
  <div class="modal" tabindex="-1" style="display: block; background-color: rgba(0, 0, 0, 0.4)">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Aggiungi insegnamento</h5>
        </div>
        <div class="p-2">
          <select class="form-select mb-2" v-model="courseId">
            <option selected value="-1">Scegli il corso</option>
            <option v-for="course in state.courses" :key="course.id" :value="course">
              {{ course.title }}
            </option>
          </select>

          <select class="form-select" v-model="profId">
            <option selected value="-1">Scegli il professore</option>
            <option v-for="prof in state.allProfessors" :key="prof.id" :value="prof">
              {{ prof.name }} {{ prof.surname }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="$emit('closeTeachingModal')"
            alt="chiudi modale"
          >
            Annulla
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="_addNewTeaching()"
            :disabled="profId === '-1' || courseId === '-1'"
          >
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
