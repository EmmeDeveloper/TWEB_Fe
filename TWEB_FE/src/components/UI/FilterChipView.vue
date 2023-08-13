<template>
  <div
    class="filter-chip"
    :class="{ selected: props.selected }"
    @click="toggleSelection"
  >
    {{ label }}
  </div>
</template>

<script setup>

import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String,
  selected: Boolean,
});

const emit = defineEmits(['click']);
  
const toggleSelection = () => {
  emit('click');
};
</script>



<style>
.filter-chip {
  display: inline-block;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 16px;
  cursor: pointer;
  margin-left:5px;
  margin-right:5px;
}

.filter-chip.selected {
  background-color: #1976d2;
  color: #fff;
}
</style>
