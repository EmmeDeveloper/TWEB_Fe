<script setup>
import { ref } from 'vue';

const props = defineProps({
  repetition: Object,
  item: Number,
  date: Date,
  courseProfMap: {
    type: Map,
    required: true,
  },
})

const state = ref({
  isLogged: false,
  isLoading: false,
  reserveSuccess: false,
})

</script>

<template>
  <div>
    <Details :time="props.time" :date="props.date" />

    <div class="sticky-header" v-for="(professors, subject) in props.courseProfMap" :key="subject">
      <div v-if="!professors.length" class="course-title">
        {{ state.courses.find((course) => course.ID === subject)?.title }}
      </div>

      <div v-else class="professor-row">
        <div class="flow-row">
          <FilterChip
            v-for="professor in professors"
            :key="professor.ID"
            :selected="selectedSubjectProf.value.first === subject && selectedSubjectProf.value.second === professor.ID"
            @click="selectProfessor(subject, professor.ID)"
            :label="`${professor.name} ${professor.surname}`"
            :enabled="!state.isLoading && !state.reserveSuccess"
          />
        </div>
      </div>
    </div>

    <div v-if="state.reserveSuccess" class="success-message">
      Prenotazione effettuata con successo!
    </div>

    <Button class="button"
      @click="onReserve(selectedSubjectProf.value.first, selectedSubjectProf.value.second)"
      :enabled="selectedSubjectProf.value.first !== '' && selectedSubjectProf.value.second !== ''"
      :loading="state.isLoading"
    >
      <div v-if="state.isLogged">Prenota</div>
      <div v-else>Accedi e prenota</div>
    </Button>
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

/* Add styles for LoadingButton and FilterChip components if not already done */
</style>