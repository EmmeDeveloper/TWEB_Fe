<template>
  <div class="border-primary border bg-primary-12 d-flex flex-wrap m-2 mx-1 p-2 pointer rounded-pill"
    :class="{ selected: uiData.selected, disabled: !uiData.enabled }"
    @click="toggleSelection"
  >
    {{ uiData.label }}
  </div>
</template>

<script setup>

import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  label: String,
  selected: Boolean,
  enabled: Boolean
});

const uiData = computed(() => {
  return {
    label: props.label,
    selected: props.selected,
    enabled: props.enabled
  }
})

const emit = defineEmits(['click']);
  
const toggleSelection = () => {
  if (!props.enabled) return;
  emit('click');
};
</script>



<style>

.selected {
  background-color: var(--PRIMARY-COLOR);
  color: #fff;
}

.disabled {
  opacity: 0.5;
  cursor: default;
}



</style>
