<script setup>
import { useStore } from '../../StateService.js'
import { ref, computed } from 'vue';

const props = defineProps({
  adminView: Boolean,
  time: String,
  repetition: Object,
  repetitions: Array,
  showFreeItems: Boolean,
})

const emits = defineEmits(['selectRepetition', 'selectFreeItem', 'selectMultipleRepetitions']);

const state = ref(useStore());

const freeItems = computed(() => {
  if (props.adminView)  {
    return null;
  };

  const freeItems = state.value.filteredTeachings;
  for (const repetition of props.repetitions || []) {
    if (freeItems[repetition.course?.id]) {
      freeItems[repetition.course?.id] = freeItems[repetition.course?.id].filter((item) => {
        return item.id != repetition.professor?.id;
      });
      if (freeItems[repetition.course?.id].length == 0) {
        delete freeItems[repetition.course?.id];
      }
    }
  }
  return freeItems;
});

const freeSubjects = computed(() => {
  if (props.adminView)  {
    return null;
  };


  const courseMap = state.value.filteredCourses.reduce((acc, course) => {
    acc[course.id] = course.title;
    return acc;
  }, {});
  return Object.keys(freeItems.value).map((courseId) => {
    return courseMap[courseId];
  }).join(', ');
});

const freeProfessors = computed(() => {
  if (props.adminView)  {
    return null;
  };

  return Object
  .values(freeItems.value)
  .flat()
  .map(prof => prof.name + ' ' + prof.surname)
  .join(', ');
});


function selectFreeItem() {
  emits('selectFreeItem');
}

function selectRepetition() {
  emits('selectRepetition');
}

function selectMultipleRepetitions() {
  emits('selectMultipleRepetitions');
}


</script>

<template>
  <div>
    {{ props.time }}
            <template v-if="props.adminView">

              ADDDDDDMIIIIIN
              DA FARE

            </template>

            <template v-else> 

              <template v-if="props.repetition != null">
                <div @click="selectRepetition()">
                  {{ props.repetition }}
                </div>
              </template>

              <template v-else-if="props.showFreeItems">
                <div @click="selectFreeItem()">
                  {{ freeSubjects }}
                  {{ freeProfessors }}
                </div>
              </template>
            </template>
  </div>
</template>