<script setup>
import InputTextView from '@/components/UI/InputTextView.vue'
import { ref } from 'vue'
import { addNewCourse } from '@/StateService.js'
const emits = defineEmits(['closeCourseModal'])

let title = ref('')

async function _addNewCourse() {
  addNewCourse(title.value)
  emits('closeCourseModal', false)
}
</script>

<template>
  <div class="modal" tabindex="-1" style="display: block; background-color: rgba(0, 0, 0, 0.4)">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Aggiungi corso</h5>
        </div>
        <div class="p-2">
          <InputTextView type="text" name="Titolo" id="titolo" v-model="title" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="$emit('closeCourseModal')"
            alt="chiudi modale"
          >
            Annulla
          </button>
          <button type="button" class="btn btn-primary" @click="_addNewCourse()">Aggiungi</button>
        </div>
      </div>
    </div>
  </div>
</template>
