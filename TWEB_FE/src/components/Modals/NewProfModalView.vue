<script setup>
import InputTextView from '@/components/UI/InputTextView.vue'
import { ref } from 'vue'
import { addNewProf } from '@/StateService.js'
const emits = defineEmits(['closeProfModal'])

let name = ref('')
let surname = ref('')

async function _addNewProf() {
  const status = addNewProf(name.value, surname.value)
  emits('closeProfModal', false)
}
</script>

<template>
  <div class="modal" tabindex="-1" style="display: block; background-color: rgba(0, 0, 0, 0.4)">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Aggiungi professore</h5>
        </div>
        <div class="p-2">
          <InputTextView type="text" name="Nome" id="name" v-model="name" />
          <InputTextView type="text" name="Cognome" id="surname" v-model="surname" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="$emit('closeProfModal')"
            alt="chiudi modale"
          >
            Annulla
          </button>
          <button type="button" class="btn btn-primary" @click="_addNewProf()">Aggiungi</button>
        </div>
      </div>
    </div>
  </div>
</template>
