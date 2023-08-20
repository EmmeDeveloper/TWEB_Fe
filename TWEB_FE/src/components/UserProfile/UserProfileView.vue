<script setup>
import { BACKEND_LINK } from '../../environment'
import { ref, onBeforeMount } from 'vue'
import LessonCardView from '@/components/LessonCard/LessonCardView.vue'
import './UserProfile.css'
import { PAGE_HOME } from '../../constants'
import { logout, getCoursesRepetitions } from '../../StateService.js'

const props = defineProps({ userData: Object })
const emits = defineEmits(['changePage', 'updateUser'])
const allRepetitions = ref([])
const nextRepetitions = ref([])
const pastRepetitions = ref([])

onBeforeMount(async () => {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const result = await fetch(
      `${BACKEND_LINK}/users/repetitions?userID=${props.userData.id}&startDate=2020-01-01&endDate=2023-12-31`,
      requestOptions
    )

    if (result.status == 200) {
      // let allRepetitions = (await result.json()).repetitions
      //togliere allRepetitions.value e scommentare la parte di sopra, togliere const allRepetitions da su
      nextRepetitions.value = allRepetitions.value.filter(
        (repetition) => new Date(repetition.date).setHours(repetition.time) >= new Date()
      )
      pastRepetitions.value = allRepetitions.value.filter(
        (repetition) => new Date(repetition.date).setHours(repetition.time) < new Date()
      )
    } else console.log('error')
  } catch (error) {
    console.log(error)
  }
})

function _logout() {
  logout().then(() => {
    getCoursesRepetitions()
    emits('changePage', PAGE_HOME)
    emits('updateUser', null)
  })
}
</script>

<template>
  <div class="user-info">
    <div class="user-info-card">
      <div class="user-info-section">
        <div class="user-info-data">
          <div class="title">Nome:</div>
          <div class="dato">{{ userData.name }}</div>
        </div>
        <div class="user-info-data">
          <div class="title">Cognome:</div>
          <div class="dato">{{ userData.surname }}</div>
        </div>
        <div class="user-info-data" v-if="userData.birthDate">
          <div class="title">Data di nascita:</div>
          <div class="dato">{{ userData.birthDate }}</div>
        </div>
      </div>
      <div class="user-info-section">
        <div class="user-info-data" v-if="userData.email">
          <div class="title">Email:</div>
          <div class="dato">{{ userData.email }}</div>
        </div>
        <div class="user-info-data" v-if="userData.phone">
          <div class="title">Numero di telefono:</div>
          <div class="dato">{{ userData.phone }}</div>
        </div>
        <div class="user-info-data" v-if="userData.address">
          <div class="title">Indirizzo:</div>
          <div class="dato">{{ userData.address }}</div>
        </div>
        <div class="user-info-data" v-if="userData.memberSince">
          <div class="title">Iscritto dal:</div>
          <div class="dato">{{ userData.memberSince }}</div>
        </div>
      </div>
      <div class="flex align-center">
        <span class="cursor-pointer logout-text" @click="_logout()">Logout</span>
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-space-evenly">
    <div class="flex flex-column align-center">
      <span class="section">Prossima lezione</span>
      <div class="flex gap-2 padding-1" v-if="nextRepetitions.length > 0">
        <LessonCardView
          v-for="repetition in nextRepetitions"
          :repetition="repetition"
          :key="repetition.id"
        ></LessonCardView>
      </div>
    </div>
    <div class="flex flex-column align-center">
      <span class="section">Lezione precedente</span>
      <div class="flex gap-2 padding-1" v-if="pastRepetitions.length > 0">
        <LessonCardView
          :repetition="pastRepetitions[0]"
          :key="pastRepetitions[0].id"
        ></LessonCardView>
      </div>
    </div>
  </div>
</template>
