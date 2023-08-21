<script setup>
import './LoginModal.css'
import InputTextView from '@/components/UI/InputTextView.vue'
import { ref } from 'vue'
import { login, getCoursesRepetitions, getUserRepetitions } from '../../StateService.js'

defineProps({
  modelValue: Object
})
const emits = defineEmits(['updateUser', 'close'])

let accountValue = ref('')
let passwordValue = ref('')

function _login(accountValue, passwordValue) {
  login(accountValue, passwordValue).then((u) => {
    getCoursesRepetitions()
    getUserRepetitions(u.id)
    emits('updateUser', u)
    emits('close')
  })
}
</script>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <form class="modal-container" @submit.prevent="_login(accountValue, passwordValue)">
        <div class="modal-header flex flex-row justify-center">
          <slot name="header">
            <p class="title-modal">Accedi</p>
            <img class="pointer image-position" style="width: 25px" src="../../assets/x-circle.svg"
              @click="$emit('close')" alt="chiudi modale" />
          </slot>
        </div>
        <div class="modal-body">
          <InputTextView type="text" name="Account" id="account" v-model="accountValue" />
          <InputTextView type="password" name="Password" id="password" v-model="passwordValue" />
        </div>
        <div class="modal-footer flex justify-center">
          <button class="btn btn-primary pointer" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
