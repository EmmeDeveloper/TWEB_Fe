<script setup>
import { useStore } from '../../StateService.js'
import { ref, computed } from 'vue';

const props = defineProps({
  adminView: Boolean,
  time: String,
  repetition: Object,
  repetitions: Array,
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



</script>

<template>
  <div>
    {{ props.time }}
            {{ props.repetition }}
            {{ props.repetitions }}

            <template v-if="props.adminView">

              ADDDDDDMIIIIIN

            </template>

            <template v-else> 

              <template v-if="props.repetition != null">
                <div @click="selectRepetition()">
                  {{ props.repetition.course }}
                </div>
              </template>

              <template v-else>
                <div @click="selectFreeItem()">
                  Disponibile
                  {{ freeItems }}
                </div>
              </template>
            </template>
  </div>
</template>