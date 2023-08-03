import { provide, ref, inject } from 'vue'
import { PAGE_HOME } from './constants'
import { BACKEND_LINK } from './environment'

const state = ref({
  userData: null,
  currentPage: PAGE_HOME,
  courses: [],
  allRepetitions: [],
  userRepetitions: [],
  allProfessors: []
})

export function initStore() {
  provide('state', state)
  return state
}

export function useStore() {
  return inject('state')
}

export function updatePage(p) {
  state.value.currentPage = p
}

export function updateUser(p) {
  state.value.userData = p
}

// ****** API CALLS ******

export async function login(accountValue, passwordValue) {
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
    const data = await result.json()
    return data.user
  } catch (error) {
    console.log(error)
  }
}

export async function logout() {
  try {
    var requestOptions = {
      method: 'POST',
      body: new URLSearchParams(),
      redirect: 'follow'
    }
    const result = await fetch(`${BACKEND_LINK}/logout`, requestOptions)
    if (result.status != 200) console.log('error')
  } catch (error) {
    console.log(error)
  }
}

export async function getAllCourses() {
  try {
    const response = await fetch(`${BACKEND_LINK}/courses`)
    const data = await response.json()
    state.value.courses = data.courses
  } catch (error) {
    console.log(error)
  }
}

export async function getUserRepetitions(userID) {
  if (userID == null) userID = state.value.userData.id
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const result = await fetch(
      `${BACKEND_LINK}/users/repetitions?userID=${userID}&startDate=2022-01-01&endDate=2024-12-31`,
      requestOptions
    )

    if (result.status == 200) {
      const userRepetitions = (await result.json()).repetitions
      state.value.userRepetitions = userRepetitions
    } else console.log('error')
  } catch (error) {
    console.log(error)
  }
}

export async function getCoursesRepetitions(courseIds = []) {
  if (courseIds.length == 0) courseIds = state.value.courses.map((c) => c.id)

  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    var ids = courseIds.map((id) => `courseIDs=${id}`).join('&')

    const result = await fetch(
      `${BACKEND_LINK}/repetitions?${ids}&startDate=2022-01-01&endDate=2024-12-31`,
      requestOptions
    )

    if (result.status == 200) {
      const allRepetitions = (await result.json()).repetitions
      state.value.allRepetitions = allRepetitions
    } else console.log('error')
  } catch (error) {
    console.log(error)
  }
}

export async function updateRepetitionStatus(id, status, note) {
  var raw = JSON.stringify({
    id,
    note
  })

  try {
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow',
      body: raw
    }

    const result = await fetch(`${BACKEND_LINK}/repetitions?status=${status}`, requestOptions)

    if (result.status != 200) {
      console.log('error', result)
      throw new Error('error')
    }
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export async function getAllProfessors() {
  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const result = await fetch(`${BACKEND_LINK}/professors`, requestOptions)

    if (result.status != 200) {
      console.log('error', result)
      throw new Error('error')
    }

    state.value.allProfessors = (await result.json()).professors
  } catch (error) {
    throw new Error(error)
  }
}
