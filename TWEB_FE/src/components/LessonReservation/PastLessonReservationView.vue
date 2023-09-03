<script setup>
import { computed, ref, watch } from 'vue';
import LessonReservationDetails from './LessonReservationDetails.vue'
import { updateRepetitionStatus } from '../../StateService.js'
import { REPETITION_STATUS_DONE, REPETITION_STATUS_DELETED } from '../../constants.js'
import './LessonReservationView.css'

const props = defineProps({
  repetition: Object
})

const emits = defineEmits(['updatedLesson', 'close'])

const state = ref({
  isLoading: false,
  updateSuccess: false,
  showIssue: false,
  selectedIssue: null,
})

watch(() => props.repetition, (newRep, oldRep) => {
  if (newRep?.id != oldRep?.id) {
    state.value.updateSuccess = false
  }
});

const note = ref('');

const uiData = computed(() => {
  return {
    title: getTitle(),
    time: props.repetition.time,
    date: new Date(props.repetition.date),
    course: props.repetition.course,
    professor: props.repetition.professor,
  }
});

const issues = [
  "Il professore era assente",
  "Ho avuto un contrattempo",
  'La lezione e\' stata annullata',
  "Altro"
]

state.value.selectedIssue = issues[0]


function close() {
  emits('close')
}

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
  if (state.value.updateSuccess) return;
  state.value.showIssue = !state.value.showIssue;
  uiData.value.title = getTitle();
  note.value = '';
}

function getTitle() {
  if (props.repetition.status != 'pending') return 'La tua lezione';
  return state.value.showIssue ? 'Cosa è andato storto?' : 'Hai effettuato la lezione?';
}

</script>

<template>
  <div class="container d-flex flex-column">
    <div class="d-flex flex-row-reverse mt-2">
      <i class="mdi mdi-close fs-4 px-1 pointer" @click="close()"></i>
    </div>
    <LessonReservationDetails v-if="!state.showIssue" :title="uiData.title" :time="uiData.time" :date="uiData.date" :course="uiData.course"
          :professor="uiData.professor" :note="props.repetition.note" />

    <template v-if="repetition.status == 'pending'">
      <template v-if="!state.showIssue">
        <textarea type="text" class="form-control mt-4" placeholder="Aggiungi una nota" aria-label="Note" v-model="note" rows="5" :disabled="state.updateSuccess"></textarea>

        <div class="warning-box">
          <i class="mdi mdi-alert"></i>
          <span>Confermando la lezione come effettuata, non sarà più possibile modificarla.</span>
        </div>

        <template v-if="!state.updateSuccess">
          <button type="button" class="btn btn-primary w-100" :disabled="state.isLoading" :loading="state.isLoading"
            @click="updateLesson(REPETITION_STATUS_DONE, note)">
            Conferma
          </button>

          <span class="p-1">Qualcosa è andato storto? <a @click="toggleIssue()" class="text-primary">Segnalalo</a></span>
        </template>

        <div v-else class="success-message">
          Lezione confermata con successo!
        </div>
      </template>

      <template v-if="state.showIssue">

        <div class="d-flex">
          <i class="mdi mdi-chevron-left fs-3 px-1 pointer" style="line-height: 1.2;" @click="toggleIssue()"></i>
          <h3>Cosa è andato storto?</h3>
        </div>

        <div class="form-check form-check-inline" v-for="issue in issues" :key="issue">
            <input type="radio" class="form-check-input fs-5" :value="issue" v-model="state.selectedIssue" :id="issue" :disabled="state.updateSuccess" />
            <label class="form-check-label fs-5" :for="issue">{{ issue }}</label>
        </div>

        <textarea type="text" class="form-control mt-4" placeholder="Inserisci un commento" aria-label="Note" :disabled="state.selectedIssue != issues[3] || state.updateSuccess" v-model="note" rows="5"></textarea>

        <div class="warning-box">
          <i class="mdi mdi-alert"></i>
          Segnalando un problema, la lezione verrà considerata come non effettuata, e non sarà più possibile
          modificarla.
        </div>

        <template v-if="!state.updateSuccess">
          <button type="button" class="btn btn-primary w-100" :disabled="state.isLoading" :loading="state.isLoading"
            @click="updateLesson(REPETITION_STATUS_DELETED, state.selectedIssue != issues[3] ? state.selectedIssue : note)">
            Conferma
          </button>
        </template>

        <div v-else class="success-message">
          <span v-if="state.showIssue">Segnalazione effettuata con successo!</span>
          <span v-else>Lezione confermata con successo!</span>
        </div>
      </template>
    </template>
  </div>
</template>