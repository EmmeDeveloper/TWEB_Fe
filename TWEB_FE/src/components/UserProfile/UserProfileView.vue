<script setup>
import { BACKEND_LINK } from '../../environment'
import { ref } from 'vue'
import LessonCardView from '../LessonCard/LessonCardView.vue'

const props = defineProps({ userData: Object })
const emits = defineEmits(['changePage', 'updateUser'])
const repetitions = ref([
  {
    date: '2023-03-26',
    time: 13,
    status: 'deleted',
    note: 'ripetizioni',
    professor: { surname: 'Neri', id: '3', name: 'Carlo' },
    user: { id: '1', role: 'User', email: 'giovanni@example.com', account: 'giovanni' },
    id: 'ff439e73-f69a-47b9-8713-37c02c17d4b5',
    idcourse: '1'
  },
  {
    date: '2023-03-26',
    time: 14,
    status: 'deleted',
    note: 'Ripetizione annullata per cancellazione professore',
    professor: null,
    user: { id: '1', role: 'User', email: 'giovanni@example.com', account: 'giovanni' },
    id: '240b9df2-ce6f-48e0-9f90-850cffb0e38a',
    idcourse: '1'
  },
  {
    date: '2023-03-26',
    time: 16,
    status: 'deleted',
    note: 'Ripetizione annullata per cancellazione professore',
    professor: null,
    user: { id: '1', role: 'User', email: 'giovanni@example.com', account: 'giovanni' },
    id: 'ed56dc6b-97b4-48af-ab22-f8f0007382e5',
    idcourse: '1'
  },
  {
    date: '2023-03-26',
    time: 17,
    status: 'deleted',
    note: 'Ripetizione annullata per cancellazione professore',
    professor: null,
    user: { id: '1', role: 'User', email: 'giovanni@example.com', account: 'giovanni' },
    id: '693aa269-53a7-42a1-a6aa-3d7a94e6b446',
    idcourse: '1'
  },
  {
    date: '2023-03-26',
    time: 18,
    status: 'deleted',
    note: 'Ripetizione annullata per cancellazione professore',
    professor: null,
    user: { id: '1', role: 'User', email: 'giovanni@example.com', account: 'giovanni' },
    id: '4b5283bb-c998-4cc8-ad48-29a61347f858',
    idcourse: '1'
  },
  {
    date: '2023-08-26',
    time: 16,
    status: 'pending',
    note: null,
    professor: { surname: 'Neri', id: '3', name: 'Carlo' },
    user: { id: '1', role: 'User', email: 'giovanni@example.com', account: 'giovanni' },
    id: 'd6db71c8-5bd9-443e-9cf1-2e94111d514b',
    idcourse: '1'
  }
])

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
      emits('changePage', 'HOME')
    } else console.log('error')
  } catch (error) {
    console.log(error)
  }
}

async function getUserRepetitions() {
  if (!props.userData) console.log('fare un popup che dice che non sei loggato')

  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    const result = await fetch(
      `${BACKEND_LINK}/users/repetitions?userID=${props.userData.id}&startDate=2023-01-01&endDate=2023-12-31`,
      requestOptions
    )

    if (result.status == 200) {
      repetitions.value = (await result.json()).repetitions
    } else console.log('error')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <button @click="getUserRepetitions()">ripe</button>
  <button class="delete-button cursor-pointer" @click="logout()">Logout</button>
  <div class="flex gap-2 padding-1" v-if="repetitions.length > 0">
    <LessonCardView
      v-for="repetition in repetitions"
      :repetition="repetition"
      :key="repetition.id"
    ></LessonCardView>
  </div>
</template>
