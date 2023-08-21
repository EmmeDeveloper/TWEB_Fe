<script setup>
const props = defineProps({
  objectConfirmModal: {
    title: String,
    text: String
  }
})

const emits = defineEmits(['close', 'ok'])
</script>

<template>
  <div class="modal" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ props.objectConfirmModal.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ props.objectConfirmModal.text }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="emits('close')"
          >
            Annulla
          </button>
          <button type="button" class="btn btn-primary" @click="emits('ok')">Conferma</button>
        </div>
      </div>
    </div>
  </div>
</template>
