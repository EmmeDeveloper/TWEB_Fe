<script setup>
import { BACKEND_LINK } from '../../environment'
import { ref, onBeforeMount } from 'vue'
import LessonCardView from '@/components/LessonCard/LessonCardView.vue'
import './UserProfile.css'
import { PAGE_HOME } from '../../constants'

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

async function logout() {
  try {
    var requestOptions = {
      method: 'POST',
      body: new URLSearchParams(),
      redirect: 'follow'
    }
    const result = await fetch(`${BACKEND_LINK}/logout`, requestOptions)
    if (result.status == 200) {
      emits('updateUser', null)
      emits('changePage', PAGE_HOME)
    } else console.log('error')
  } catch (error) {
    console.log(error)
  }
}

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
</script>

<template>
  <button class="delete-button cursor-pointer" @click="logout()">Logout</button>
  <div class="flex flex-column padding-1">
    <span class="section">Le tue prossime lezioni</span>
    <div class="flex gap-2 padding-1" v-if="nextRepetitions.length > 0">
      <LessonCardView
        v-for="repetition in nextRepetitions"
        :repetition="repetition"
        :key="repetition.id"
      ></LessonCardView>
    </div>
    <span class="section">Le tue lezioni passate</span>
    <div class="flex gap-2 padding-1" v-if="pastRepetitions.length > 0">
      <LessonCardView
        v-for="pastRepetition in pastRepetitions"
        :repetition="pastRepetition"
        :key="pastRepetition.id"
      ></LessonCardView>
    </div>
  </div>
</template>
