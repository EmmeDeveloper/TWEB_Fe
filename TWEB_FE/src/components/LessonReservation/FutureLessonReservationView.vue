<script setup>
import { ref, computed } from 'vue'
import LessonReservationDetails from './LessonReservationDetails.vue'
import FilterChip from '../UI/FilterChipView.vue'
import { useStore, addRepetition } from '../../StateService.js'

const props = defineProps({
  repetition: Object,
  time: Number,
  date: Date,
  courseProfMap: {
    type: Object,
    required: true
  },
})

const globalState = ref(useStore());

const emits = defineEmits(['reservedLesson', 'loginClicked', 'deletedLesson']);

const state = ref({
  isLogged: globalState.value.userData != null,
  isLoading: false,
  reserveSuccess: false
})

const selectedSubjectProf = ref({
  subject: '',
  prof: ''
})

function selectProfessor(subject, prof) {
  selectedSubjectProf.value.subject = subject
  selectedSubjectProf.value.prof = prof
}

function loginClicked() {
  emits('loginClicked')
}

async function reserve(subject, prof) {
  console.log('reserve')
  state.value.isLoading = false
  await addRepetition(subject, prof, props.date, props.time).then(() => {
    state.value.reserveSuccess = true
    emits('reservedLesson')
  }).finally(() => {
    state.value.isLoading = false
  })
}

const uiData = computed(() => {
  return {
    title: props.repetition != null ? 'La tua lezione' : null,
    time: props.repetition != null ? props.repetition.time : props.time,
    date: props.repetition != null ? new Date(props.repetition.date) : props.date,
    course: props.repetition != null ? props.repetition.course : null,
    professor: props.repetition != null ? props.repetition.professor : null
  }
});

</script>

<template>
  <div>
    {{ uiData }}
    <LessonReservationDetails :title="uiData.title" :time="uiData.time" :date="uiData.date" :course="uiData.course" :professor="uiData.professor" />

    <!-- NEW LESSON -->
    <div v-if="!props.repetition">
      <div class="sticky-header" v-for="(profs, subject) in props.courseProfMap" :key="subject">
        <div v-if="profs.length != 0" class="course-title">
          {{ subject }}
          {{ globalState.courses.find((course) => course.id === subject)?.title }}

          <div class="professor-row">
            <div class="flow-row">
              <FilterChip v-for="professor in profs" :key="professor.id" :selected="selectedSubjectProf.subject === subject && selectedSubjectProf.prof === professor.id
                " @click="selectProfessor(subject, professor.id)" :label="`${professor.name} ${professor.surname}`"
                :enabled="!state.isLoading && !state.reserveSuccess" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="state.reserveSuccess" class="success-message">
        Prenotazione effettuata con successo!
      </div>
      <button v-else class="button" :disabled="selectedSubjectProf.subject == '' || selectedSubjectProf.prof == ''"
        :loading="state.isLoading">
        <div v-if="state.isLogged" @click="reserve(selectedSubjectProf.subject, selectedSubjectProf.prof)">
          Prenota
        </div>
        <div v-else @click="loginClicked()">Accedi e prenota</div>
      </button>
    </div>

    <!-- RESERVED LESSON -->
    <div v-else>
      <div class="error-box">
        <i class="mdi mdi-alert" style="padding-right: 8px;"></i>
        Cancellando la prenotazione non sarà più possibile ripristinarla, e il professore potrebbe non essere disponibile
        in futuro.
      </div>

      <div v-if="state.reserveSuccess" class="success-message">
        Prenotazione cancellata con successo!
      </div>
      <button v-else class="button" :disabled="selectedSubjectProf.subject == '' || selectedSubjectProf.prof == ''"
        :loading="state.isLoading">
        <i class="mdi mdi-delete" style="padding-right: 8px;"></i>
        Cancella prenotazione
      </button>
    </div>
  </div>
</template>

<style>
/* Add your styles here */
.sticky-header {
  position: sticky;
  top: 0;
  background-color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 8px;
}

.course-title {
  padding: 8px;
}

.professor-row {
  padding: 8px;
}

.flow-row {
  display: flex;
  flex-wrap: wrap;
}

.success-message {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 24px 16px;
}

.error-box {}
</style>
