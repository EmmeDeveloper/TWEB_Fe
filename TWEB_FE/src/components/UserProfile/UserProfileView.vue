<script setup>
import { ref, computed } from 'vue'
import LessonCardView from '@/components/LessonCard/LessonCardView.vue'
import './UserProfile.css'
import { PAGE_HOME } from '../../constants'
import { logout, getCoursesRepetitions, useStore } from '../../StateService.js'

const props = defineProps({ userData: Object })
const emits = defineEmits(['changePage', 'updateUser'])

const userData = computed(() => props.userData)
const state = ref(useStore())
const repetitions = computed(() => state.value.userRepetitions)
const nextRepetition = computed(() => repetitions.value.filter(
  (repetition) => new Date(repetition.date).setHours(repetition.time) >= new Date()
)).value[0] || null
const pastRepetition = computed(() => repetitions.value.filter(
  (repetition) => new Date(repetition.date).setHours(repetition.time) < new Date()
)).value[0] || null


function _logout() {
  logout().then(() => {
    getCoursesRepetitions()
    emits('changePage', PAGE_HOME)
    emits('updateUser', null)
  })
}
</script>

<template>
  <div class="d-flex flex-column">
    <div>
      <div class="d-flex flex-row-reverse">
        <div class="align-items-center justify-content-center d-flex p-2 my-2 me-2 bg-primary rounded-4 pointer" @click="_logout">
          <i class="mdi mdi-logout-variant fs-4 pointer text-white" style="color: rgba(255, 255, 255, 0.8)"></i>
          <span class="px-2 text-white">Logout</span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-sm-row flex-column gap-2 justify-center">
      <div class="border d-flex flex-column p-3 rounded-4 mx-3 bg-primary-12">
        <div class="d-flex flex-row gap-4">
          <img src="@/assets/person-circle.svg" alt="profilo utente" class="rounded-circle"
            style="width: 7rem; height: 7rem" />
          <div class="d-flex flex-column">
            <span class="fs-5 fw-bold">{{ userData.name }} {{ userData.surname }}</span>
            <span class="c-primary fw-bolder">{{ userData.role }}</span>
            <span class="text-secondary">{{ userData.address || 'Italia, Piemonte, Torino' }}</span>
          </div>
        </div>
        <div class="d-flex flex-column gap-2 mt-3">
          <span class="text-center">Informazioni personali</span>
          <div class="d-flex flex-row justify-content-between">
            <span>Account</span>
            <span>{{ userData.account }}</span>
          </div>
          <div class="d-flex flex-row justify-content-between">
            <span>Email</span>
            <span>{{ userData.email }}</span>
          </div>
          <div class="d-flex flex-row justify-content-between">
            <span>Data di nascita</span>
            <span>{{ userData.birthDate || '21 nov, 1996' }}</span>
          </div>
          <div class="d-flex flex-row justify-content-between">
            <span>Telefono</span>
            <span>{{ userData.phone || '3387828981' }}</span>
          </div>
          <div class="d-flex flex-row justify-content-between">
            <span>Membro dal</span>
            <span>{{ userData.memberSince || '07/02/2023' }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-column">
        <div class="flex flex-column px-3">
          <span class="section fs-4">Prossima lezione</span>
          <div class="flex gap-2 padding-1" v-if="nextRepetition">
            <LessonCardView  :repetition="nextRepetition" :key="nextRepetition?.id" />
          </div>
        </div>
        <div class="flex flex-column px-3">
          <span class="section fs-4">Lezione precedente</span>
          <div class="flex gap-2 padding-1" v-if="pastRepetition">
            <LessonCardView :repetition="pastRepetition" :key="pastRepetition?.id"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
