<script setup>
import { ref } from 'vue';
import LessonReservationDetails from './LessonReservationDetails.vue';
import FilterChip from '../UI/FilterChipView.vue';
import { useStore } from '../../StateService.vue';

const props = defineProps({
  repetition: Object,
  time: Number,
  date: Date,
  courseProfMap: {
    type: Object,
    required: true,
  },
  isLogged: Boolean
})

const globalState = useStore();

const emits = defineEmits(['reservedLesson', 'loginClicked'])

const state = ref({
  isLogged: globalState.userData != null,
  isLoading: false,
  reserveSuccess: false,
})

const selectedSubjectProf = ref({
  subject: '',
  prof: '',
})

function selectProfessor(subject, prof) {
  selectedSubjectProf.value.subject = subject;
  selectedSubjectProf.value.prof = prof;
}

function reserve(subject, prof) {
  state.value.isLoading = true;
  setTimeout(() => {
    state.value.isLoading = false;
    state.value.reserveSuccess = true;
  }, 1000);
}

function loginClicked() {
  emits('loginClicked')
}

</script>

<template>
  <div>
    <div v-for="(values, key) in prova2" :key="key">
      <h3>{{ key }}</h3>
      <ul>
        <li v-for="value in values" :key="value">
          {{ value }}
        </li>
      </ul>
    </div>
  </div>

  <div>
    <LessonReservationDetails :time="props.time" :date="props.date" />

    {{ props.courseProfMap }}
    {{ globalState.courses }}

    <div class="sticky-header" v-for="(profs, subject) in props.courseProfMap" :key="subject">
      <div v-if="profs.length != 0" class="course-title">
        {{ subject }}
        {{ globalState.courses.find((course) => course.id === subject)?.title }}

        <div class="professor-row">
          <div class="flow-row">
            <FilterChip v-for="professor in profs" :key="professor.id"
              :selected="selectedSubjectProf.subject === subject && selectedSubjectProf.prof === professor.id"
              @click="selectProfessor(subject, professor.id)" :label="`${professor.name} ${professor.surname}`"
              :enabled="!state.isLoading && !state.reserveSuccess" />
          </div>
        </div>
      </div>

    </div>

    <div v-if="state.reserveSuccess" class="success-message">
      Prenotazione effettuata con successo!
    </div>

    <button class="button"
      :enabled="selectedSubjectProf.subject !== '' && selectedSubjectProf.prof !== ''" :loading="state.isLoading">
      <div v-if="props.isLogged" @click="reserve(selectedSubjectProf.subject, selectedSubjectProf.prof)">Prenota</div>
      <div v-else @click="loginClicked()">Accedi e prenota</div>
    </button>
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
</style>