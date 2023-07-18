<script setup>
defineProps({
  type: String,
  id: String,
  name: String,
  modelValue: String
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-column gap-1" style="margin-bottom: 15px">
    <label :for="id">{{ name }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :id="id"
      :name="name"
    />
  </div>
</template>
