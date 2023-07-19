<script setup>
import './LoginModal.css'
import InputTextView from '@/components/InputText/InputTextView.vue'
import { ref } from 'vue'
import { BACKEND_LINK } from '../../environment'

defineProps({
  modelValue: Object
})
const emits = defineEmits(['update:modelValue', 'close'])

let accountValue = ref('')
let passwordValue = ref('')

async function login(accountValue, passwordValue) {
  try {
    var raw = JSON.stringify({
      account: accountValue,
      password: passwordValue
    })

    var requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    }

    const result = await fetch(`${BACKEND_LINK}/login`, requestOptions)
    emits('update:modelValue', (await result.json()).user)
    emits('close')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <form class="modal-container" @submit.prevent="login(accountValue, passwordValue)">
        <div class="modal-header flex flex-row justify-center">
          <slot name="header">
            <p class="title-modal">Accedi</p>
            <img
              class="cursor-pointer image-position"
              style="width: 25px"
              src="../../assets/x-circle.svg"
              @click="$emit('close')"
              alt="chiudi modale"
            />
          </slot>
        </div>
        <div class="modal-body">
          <InputTextView type="text" name="account" id="account" v-model="accountValue" />
          <InputTextView type="password" name="password" id="password" v-model="passwordValue" />
        </div>
        <div class="modal-footer flex justify-center">
          <button class="secondary-button cursor-pointer" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
