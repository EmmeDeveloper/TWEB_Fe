<script setup>
import { BACKEND_LINK } from '../../environment'
import { ref, onBeforeMount } from 'vue'
import LessonCardView from '@/components/LessonCard/LessonCardView.vue'
import './UserProfile.css'
import { PAGE_HOME } from '../../constants'
import { logout } from '../../StateService.js'

const props = defineProps({ userData: Object })
const emits = defineEmits(['changePage', 'updateUser'])
const allRepetitions = ref([
  {
    date: '2023-03-26',
    time: 13,
    status: 'deleted',
    note: 'Ripetizione annullata per cancellazione professore',
    professor: null,
    user: {
      birthDate: '',
      phone: '',
      memberSince: '',
      address: '',
      role: 'User',
      id: '1',
      email: 'giovanni@example.com',
      surname: 'Bianchi',
      account: 'giovanni',
      name: 'Giovanni'
    },
    course: {
      title: 'Programmazione 1',
      id: '1'
    },
    id: 'ff439e73-f69a-47b9-8713-37c02c17d4b5'
  },
  {
    date: '2023-08-26',
    time: 14,
    status: 'pending',
    note: 'Ripetizione annullata per cancellazione professore',
    professor: null,
    user: {
      birthDate: '',
      phone: '',
      memberSince: '',
      address: '',
      role: 'User',
      id: '1',
      email: 'giovanni@example.com',
      surname: 'Bianchi',
      account: 'giovanni',
      name: 'Giovanni'
    },
    course: {
      title: 'Programmazione 1',
      id: '1'
    },
    id: '240b9df2-ce6f-48e0-9f90-850cffb0e38a'
  },
  {
    date: '2023-03-26',
    time: 16,
    status: 'deleted',
    note: 'Ripetizione annullata per cancellazione professore',
    professor: null,
    user: {
      birthDate: '',
      phone: '',
      memberSince: '',
      address: '',
      role: 'User',
      id: '1',
      email: 'giovanni@example.com',
      surname: 'Bianchi',
      account: 'giovanni',
      name: 'Giovanni'
    },
    course: {
      title: 'Programmazione 1',
      id: '1'
    },
    id: 'ed56dc6b-97b4-48af-ab22-f8f0007382e5'
  },
  {
    date: '2023-03-26',
    time: 17,
    status: 'deleted',
    note: 'Ripetizione annullata per cancellazione professore',
    professor: null,
    user: {
      birthDate: '',
      phone: '',
      memberSince: '',
      address: '',
      role: 'User',
      id: '1',
      email: 'giovanni@example.com',
      surname: 'Bianchi',
      account: 'giovanni',
      name: 'Giovanni'
    },
    course: {
      title: 'Programmazione 1',
      id: '1'
    },
    id: '693aa269-53a7-42a1-a6aa-3d7a94e6b446'
  },
  {
    date: '2023-03-26',
    time: 18,
    status: 'deleted',
    note: 'Ripetizione annullata per cancellazione professore',
    professor: null,
    user: {
      birthDate: '',
      phone: '',
      memberSince: '',
      address: '',
      role: 'User',
      id: '1',
      email: 'giovanni@example.com',
      surname: 'Bianchi',
      account: 'giovanni',
      name: 'Giovanni'
    },
    course: {
      title: 'Programmazione 1',
      id: '1'
    },
    id: '4b5283bb-c998-4cc8-ad48-29a61347f858'
  }
])
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
