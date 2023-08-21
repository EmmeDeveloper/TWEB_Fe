<script setup>
import { ref, computed, watch } from 'vue'
import {
  useStore, updateFilter, getCoursesRepetitions
} from '../../StateService.js'
import FilterChip from '../UI/FilterChipView.vue'

const state = ref(useStore())

const teachings = computed(() => {
  const teach = state.value.teachings;
  const selected = state.value.filteredTeachings;
  const courses = state.value.courses;

  const result = {};
  Object.keys(teach).forEach(courseId => {
    const title = courses.find(c => c.id === courseId)?.title;
    if (selected[courseId]?.length > 0) {
      result[title] = selected[courseId].length + "/" + teach[courseId].length;
    }
  });
  return result;
})

const filterCollapsed = ref(true);

const tempSelected = ref({});
updateSelected(state.value.teachings);

watch(() => state.value.teachings, (newVal, _) => {
  updateSelected(newVal)
});

function updateSelected(val) {
  tempSelected.value = {};
  Object.keys(val).forEach(courseId => {
    tempSelected.value[courseId] = val[courseId].map(p => p.id);
  });
}

function toggleFilter() {
  filterCollapsed.value = !filterCollapsed.value;
}

function toggleTeaching(courseId, profId) {
  if (profId == null) {
    if (tempSelected.value[courseId].length == 0) {
      addTeaching(courseId, null);
    } else {
      removeTeaching(courseId, null);
    }
    return;
  }
  if (tempSelected.value[courseId].includes(profId)) {
    removeTeaching(courseId, profId);
  } else {
    addTeaching(courseId, profId);
  }
}

function removeRapid(course) {
  var courseId = state.value.courses.find(c => c.title === course)?.id;
  tempSelected.value[courseId] = [];
  applyFilter();
}

function removeTeaching(courseId, profId) {
  if (profId == null) {
    tempSelected.value[courseId] = [];
    return;
  }
  tempSelected.value[courseId] = tempSelected.value[courseId].filter(p => p !== profId);
}

function applyFilter() {
  updateFilter(tempSelected.value);
  getCoursesRepetitions();
  filterCollapsed.value = true;
}

function addTeaching(courseId, profId) {
  if (tempSelected.value[courseId].length == 0 && profId == null) {
    tempSelected.value[courseId] = state.value.teachings[courseId].map(p => p.id);
    return;
  }
  tempSelected.value[courseId].push(profId);
}

</script>

<template>
  <div class="d-flex w-100 row mx-0 my-3">
    <template v-if="filterCollapsed">
      <div class="d-flex col-11 gap-2 py-1 align-center">
        <span class="fs-5" v-if="Object.keys(teachings).length == 0">Nessuna materia selezionata</span>
        <div class="d-flex px-2 py-1 border rounded-pill align-center bg-primary-12" v-for="(prof, course) in teachings"
          :key="prof">
          <i class="mdi mdi-human-male-board fs-5"></i>
          <span class="ms-1">{{ prof }}</span>
          <span class="mx-2 fw-bold">{{ course }}</span>
          <i class="align-center bg-primary fs-5 justify-center mdi mdi-close rounded-circle text-center text-white pointer"
            style="width: 2rem; height: 2rem; line-height: 1.7;" @click="removeRapid(course)"></i>
        </div>
      </div>
      <div class="d-flex col-1 justify-center align-center">
        <i class="mdi mdi-filter-variant fs-1 pointer" @click="toggleFilter()"></i>
      </div>
    </template>
    <template v-else>
      <div class="d-flex flex-column">
        <div class="d-flex flex-row-reverse">
          <i class="mdi mdi-close fs-2 pointer" @click="toggleFilter()"></i>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <template v-for="(profs, subject) in state.teachings" :key="subject">
            <FilterChip :selected="tempSelected[subject]?.length > 0" :enabled="true" @click="toggleTeaching(subject)"
              :label="state.courses.find((course) => course.id === subject)?.title" />
            <FilterChip v-for="professor in profs" :key="professor.id" :enabled="true"
              :selected="tempSelected[subject]?.includes(professor.id)" :label="`${professor.name} ${professor.surname}`"
              @click="toggleTeaching(subject, professor.id)" />
          </template>
        </div>
        <div class="d-flex justify-center mb-2 mt-1">
          <button class="btn btn-primary w-25" @click="applyFilter()">Applica</button>
        </div>
      </div>
    </template>
  </div>
</template>