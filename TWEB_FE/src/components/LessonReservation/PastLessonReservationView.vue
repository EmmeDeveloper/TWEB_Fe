<script setup>
import { ref } from 'vue';
import LessonReservationDetails from './LessonReservationDetails.vue'
import { updateRepetitionStatus } from  '../../StateService.js'
import { REPETITION_STATUS_DONE, REPETITION_STATUS_DELETED } from '../../constants.js'

const props = defineProps({
  repetition: Object
})

const emits = defineEmits(['updatedLesson'])

const state = ref({
  isLoading: false,
  updateSuccess: false,
  showIssue: false,
  selectedIssue: null,
})

const note = ref('');

const uiData = ref({
  title: 'Hai effettuato la lezione?',
  time: props.repetition.time,
  date: new Date(props.repetition.date),
  course: props.repetition.course,
  professor: props.repetition.professor,
});

const issues = [
  "Il professore era assente",
  "Ho avuto un contrattempo",
  "La lezione è stata annullata",
  "Altro"
]


async function updateLesson(status, note) {
  state.value.isLoading = false
  await updateRepetitionStatus(props.repetition.id, status, note).then(() => {
    state.value.updateSuccess = true
    emits('updatedLesson')
  }).finally(() => {
    state.value.isLoading = false
  })
}

function toggleIssue() {
  state.value.showIssue = !state.value.showIssue;
  uiData.value.title = state.value.showIssue ? 'Cosa è andato storto?' : 'Hai effettuato la lezione?';
  note.value = '';
}

</script>

<template>
  <div>
    <template v-if="!state.showIssue">
      <LessonReservationDetails :title="uiData.title" :time="uiData.time" :date="uiData.date" :course="uiData.course"
        :professor="uiData.professor" />

      <input v-model="note">

      <div class="warning-box">
        <i class="mdi mdi-alert" style="padding-right: 8px;"></i>
        Confermando la lezione come effettuata, non sarà più possibile modificarla.
      </div>


      <template v-if="!state.updateSuccess">
        <button class="button" :disabled="state.isLoading" :loading="state.isLoading" @click="updateLesson(REPETITION_STATUS_DONE ,note)">
          Conferma
        </button>

        Qualcosa è andato storto? <a @click="toggleIssue()">Segnalalo</a>
      </template>

      <div v-else class="success-message">
        Lezione confermata con successo!
      </div>
    </template>

    <template v-if="state.showIssue">

      <div>
        <i class="mdi mdi-chevron-left" style="padding-right: 8px;" @click="toggleIssue()"></i>
        <span>Cosa è andato storto?</span>
      </div>

      <div v-for="issue in issues" :key="issue">
        <label>
          <input type="radio" :value="issue" v-model="state.selectedIssue" />
          {{ issue }}
        </label>
      </div>

      <input :disabled="state.selectedIssue != issues[3]" v-model="note">

      <div class="warning-box">
        <i class="mdi mdi-alert" style="padding-right: 8px;"></i>
        Segnalando un problema, la lezione verrà considerata come non effettuata, e non sarà più possibile modificarla.
      </div>

      <template v-if="!state.updateSuccess">
        <button class="button" :disabled="state.isLoading" :loading="state.isLoading" @click="updateLesson(REPETITION_STATUS_DELETED ,note)">
          Conferma
        </button>
      </template>

      <div v-else class="success-message">
        <span v-if="state.showIssue">Segnalazione effettuata con successo!</span>
        <span v-else>Lezione confermata con successo!</span>
      </div>
    </template>


  </div>
</template>