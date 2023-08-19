<script setup>
import { ref, computed, watch } from 'vue'
import LessonReservationDetails from './LessonReservationDetails.vue'
import FilterChip from '../UI/FilterChipView.vue'
import { useStore } from '../../StateService.js'
import { BACKEND_LINK } from '../../environment.js'
import './LessonReservationView.css'

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

const emits = defineEmits(['reservedLesson', 'loginClicked', 'deletedLesson', 'close']);

const state = ref({
  isLogged: globalState.value.userData != null,
  isLoading: false,
  reserveSuccess: false
})

watch([() => props.time, () => props.date, () => props.repetition], ([newTime, newDate, newRep], [oldTime, oldDate, oldRep]) => {
  if (newTime != oldTime || newDate != oldDate || newRep?.id != oldRep?.id) {
    state.value.reserveSuccess = false
  }
});


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

function close() {
  emits('close')
}

async function deleteRepetition(id) {
  try {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    }

    const result = await fetch(`${BACKEND_LINK}/repetitions?id=${id}`, requestOptions)
    if (result.status != 200) { console.log('error'); throw new Error('error') }
  } catch (error) {
    console.log(error)
    throw new Error('error');
  }
}

async function deleteLesson(id) {
  console.log('delete')
  state.value.isLoading = false
  await deleteRepetition(id).then(() => {
    state.value.reserveSuccess = true
    emits('deletedLesson')
  }).finally(() => {
    state.value.isLoading = false
  })
}

async function addRepetition(course, professor, date, time, note) {
  try {
    var raw = JSON.stringify({
      idcourse: course,
      idprofessor: professor,
      date: date,
      note: note,
      time: time
    })

    var requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    }

    const result = await fetch(`${BACKEND_LINK}/repetitions`, requestOptions)
    if (result.status != 200) {
      console.log('error');
      throw new Error('error')
    }
  } catch (error) {
    console.log(error)
    throw new Error('error');
  }
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
    title: props.repetition != null ? 'La tua lezione' : "Prenota la lezione",
    time: props.repetition != null ? props.repetition.time : props.time,
    date: props.repetition != null ? new Date(props.repetition.date) : props.date,
    course: props.repetition != null ? props.repetition.course : null,
    professor: props.repetition != null ? props.repetition.professor : null
  }
});

</script>

<template>
  <div class="sticky">
    <div class="d-flex flex-row-reverse mt-2">
      <i class="mdi mdi-close fs-4 px-1 pointer" @click="close()"></i>
    </div>
    <LessonReservationDetails :title="uiData.title" :time="uiData.time" :date="uiData.date" :course="uiData.course"
      :professor="uiData.professor" />

    <!-- NEW LESSON -->
    <div v-if="!props.repetition">
      <div v-for="(profs, subject) in props.courseProfMap" :key="subject">
        <div v-if="profs.length != 0" class="d-flex flex-column">
          <span class="fw-bold my-2 px-2">{{ globalState.courses.find((course) => course.id === subject)?.title }}</span>

          <div class="d-flex flex-wrap">
            <FilterChip v-for="professor in profs" :key="professor.id"
              :selected="selectedSubjectProf.subject === subject && selectedSubjectProf.prof === professor.id"
              @click="selectProfessor(subject, professor.id)" :label="`${professor.name} ${professor.surname}`"
              :enabled="!state.isLoading && !state.reserveSuccess" />
          </div>
        </div>
      </div>

      <div v-if="state.reserveSuccess" class="success-message">
        Prenotazione effettuata con successo!
      </div>
      <div class="mt-4" v-else>
        <button type="button" v-if="state.isLogged" class="btn btn-primary w-100"
          :disabled="selectedSubjectProf.subject == '' || selectedSubjectProf.prof == ''" :loading="state.isLoading"
          @click="reserve(selectedSubjectProf.subject, selectedSubjectProf.prof)">
          Prenota
        </button>
        <button type="button" v-else class="btn btn-primary w-100" :loading="state.isLoading" @click="loginClicked()">
          Accedi e prenota
        </button>
      </div>

    </div>

    <!-- RESERVED LESSON -->
    <div v-else>
      <div class="error-box">
        <i class="mdi mdi-alert"></i>
        <span>Cancellando la prenotazione non sarà più possibile ripristinarla, e il professore potrebbe non essere
          disponibile in futuro.</span>
      </div>

      <div v-if="state.reserveSuccess" class="success-message">
        Prenotazione cancellata con successo!
      </div>
      <button v-else type="button" class="btn btn-danger w-100" :loading="state.isLoading"
        @click="deleteLesson(props.repetition.id)">
        <i class="mdi mdi-delete"></i>
        Cancella prenotazione
      </button>
    </div>
  </div>
</template>
