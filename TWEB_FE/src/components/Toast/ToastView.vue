<script setup>
const props = defineProps({
  text: String
})

const emits = defineEmits(['close'])

function _closeAlert() {
  emits('close')
}
</script>

<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div
      class="toast align-items-center"
      style="display: block"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">{{ props.text }}</div>
        <button
          type="button"
          class="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="_closeAlert()"
        ></button>
      </div>
    </div>
  </div>
</template>
