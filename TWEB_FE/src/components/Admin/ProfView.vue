<script setup>
import { useStore, deleteProf } from '@/StateService'
import {
  PROFESSOR_DELETED,
  PROFESSOR_NOT_DELETED,
  DELETE_PROF_TEXT,
  MODAL_TITLE
} from '@/constants'
import { ref } from 'vue'
import ToastView from '@/components/Toast/ToastView.vue'
import ConfirmModalView from '@/components/Modals/ConfirmModalView.vue'
import NewProfModalView from '../Modals/NewProfModalView.vue'

const state = ref(useStore())

const titles = ['Nome', 'Cognome', '']

const actionId = ref(null)
const profToDelete = ref(null)

const showToast = ref(false)
const objectToast = ref({ text: null, color: null })

const showModal = ref(false)
const objectConfirmModal = ref({ text: DELETE_PROF_TEXT, title: MODAL_TITLE })

const showProfModal = ref(false)

async function _deleteProf() {
  const status = await deleteProf(profToDelete.value)
  if (status === 200) {
    objectToast.value.text = PROFESSOR_DELETED
    objectToast.value.color = 'var(--DONE-COLOR-TOAST)'
  } else {
    objectToast.value.text = PROFESSOR_NOT_DELETED
    objectToast.value.color = 'var(--ERROR-COLOR-TOAST)'
  }

  showToast.value = true
}

function closeToast() {
  showToast.value = false
}

function _ok() {
  showModal.value = false
  _deleteProf()
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
                  class="btn py-1"
                  @click="
                    () => {
                      profToDelete = prof.id
                      showModal = true
                    }
                  "
                >
                  <i class="mdi mdi-trash-can-outline"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="position: fixed; right: 2rem; bottom: 2rem">
      <button class="button-add" @click="showProfModal = true">
        <i class="mdi mdi-plus fs-4"></i>aggiungi professore
      </button>
    </div>
  </div>
  <div v-if="showToast">
    <ToastView :showToast="showToast" @close="closeToast()" :objectToast="objectToast"></ToastView>
  </div>
  <div v-if="showModal">
    <ConfirmModalView
      :objectConfirmModal="objectConfirmModal"
      @close="showModal = false"
      @ok="_ok()"
    ></ConfirmModalView>
  </div>
  <NewProfModalView @closeProfModal="showProfModal = false" v-if="showProfModal" />
</template>
