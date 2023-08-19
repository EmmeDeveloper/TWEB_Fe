<script setup>
import { useStore } from '../../StateService.js'
import { ref, computed } from 'vue';
import './TimeCardView.css'

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
  if (props.adminView) {
    return null;
  };

  const items = JSON.parse(JSON.stringify(state.value.filteredTeachings));
  for (const repetition of props.repetitions || []) {
    if (items[repetition.course?.id]) {
      items[repetition.course?.id] = items[repetition.course?.id].filter((item) => {
        return item.id != repetition.professor?.id;
      });
      if (items[repetition.course?.id].length == 0) {
        delete items[repetition.course?.id];
      }
    }
  }
  return items;
});

const freeCoursesCount = computed(() => {
  if (props.adminView) {
    return null;
  };

  return Object.keys(freeItems.value).length;
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
    <template v-if="props.adminView">
      <div v-if="props.repetitions && props.repetitions.length > 0" class="item default" @click="selectMultipleRepetitions()">
        <span>{{ props.repetitions.length }} Prenotazion{{ props.repetitions.length > 1 ? 'i' : 'e' }}</span>
      </div>
    </template>

    <template v-else>

      <template v-if="props.repetition != null">
        <div @click="selectRepetition()" class="item" :class="{
          'deleted': props.repetition?.status == 'deleted',
          'done': props.repetition?.status == 'done',
          'pending': props.repetition?.status == 'pending',
        }">
          <span>{{ props.repetition.course.title }}</span>
          <span>{{ props.time }}:00</span>
        </div>
      </template>

      <template v-else-if="props.showFreeItems">
        <div @click="selectFreeItem()" class="item default">
          <span>Disponibile ({{ freeCoursesCount }}/{{ state.filteredCourses.length }})</span>
          <span>{{ props.time }}:00</span>
        </div>
      </template>
    </template>
  </div>
</template>