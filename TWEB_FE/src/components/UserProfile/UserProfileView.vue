<script setup>
import { BACKEND_LINK } from '../../environment'

defineProps({ userData: Object })

async function logout() {
  try {
    var requestOptions = {
      method: 'POST',
      body: new URLSearchParams(),
      redirect: 'follow'
    }
    const result = await fetch(`${BACKEND_LINK}/logout`, requestOptions)
    if (result.status == 200) {
      //  userData.value = null
      console.log('')
    } else console.log('error')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  {{ userData }}
  <div>
    <button class="delete-button cursor-pointer" @click="logout()">Logout</button>
  </div>
</template>
