import { provide, ref, inject } from 'vue'
import { PAGE_HOME } from './constants'
import { BACKEND_LINK } from './environment'

const state = ref({
  userData: null,
  currentPage: PAGE_HOME,
  courses: [],
  allRepetitions: [],
  userRepetitions: [],
  allProfessors: [],
  isAdmin: false,
  teachings: {},
  filteredTeachings: {},
  filteredProfessors: [],
  filteredCourses: []
})

const filterInit = ref(false)

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
  state.value.isAdmin = p?.role?.toLowerCase() == 'admin'

  // Reset filter
  state.value.filteredTeachings = state.value.teachings
  state.value.filteredProfessors = state.value.allProfessors
  state.value.filteredCourses = state.value.courses
}

export function updateFilter(selectedMap) {
  const newTeachings = {}
  const newProfessors = []
  const newCourses = []
  Object.keys(selectedMap).forEach((courseID) => {
    if (selectedMap[courseID].length > 0) {
      newTeachings[courseID] = state.value.teachings[courseID].filter((t) =>
        selectedMap[courseID].includes(t.id)
      )
      selectedMap[courseID].forEach((professorID) => {
        newProfessors.push(state.value.allProfessors.find((p) => p.id == professorID))
      })
      newCourses.push(state.value.courses.find((c) => c.id == courseID))
    }
  })

  state.value.filteredTeachings = newTeachings
  state.value.filteredProfessors = newProfessors
  state.value.filteredCourses = newCourses
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
    state.value.userRepetitions = []
    state.value.allRepetitions = []
  } catch (error) {
    console.log(error)
  }
}

export async function getAllCourses() {
  try {
    const response = await fetch(`${BACKEND_LINK}/courses`)
    if (response.status != 200) {
      console.log('error', response)
      throw new Error('error')
    }
    const data = await response.json()
    state.value.courses = data.courses
    if (state.value.filteredCourses.length == 0 && !filterInit.value)
      state.value.filteredCourses = data.courses
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
  if (courseIds.length == 0) courseIds = state.value.filteredCourses.map((c) => c.id)
  if (courseIds.length == 0) {
    state.value.allRepetitions = []
    return
  }

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
    return result.status
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
    if (state.value.filteredProfessors.length == 0 && !filterInit.value)
      state.value.filteredProfessors = state.value.allProfessors
  } catch (error) {
    throw new Error(error)
  }
}

export async function getTeachings(courseIds = []) {
  if (courseIds.length == 0) courseIds = state.value.courses.map((c) => c.id)

  try {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    var ids = courseIds.map((id) => `ids=${id}`).join('&')

    const result = await fetch(`${BACKEND_LINK}/courses/professors?${ids}`, requestOptions)

    if (result.status == 200) {
      const teachings = (await result.json()).professors
      state.value.teachings = teachings
      if (Object.keys(state.value.filteredTeachings).length == 0 && !filterInit.value) {
        state.value.filteredTeachings = teachings
        filterInit.value = true
      }
    } else console.log('error')
  } catch (error) {
    console.log(error)
  }
}

export async function deleteCourse(courseId) {
  try {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    }

    const result = await fetch(`${BACKEND_LINK}/courses?id=${courseId}`, requestOptions)

    if (result.status == 200) {
      state.value.courses = state.value.courses.filter((c) => c.id != courseId)
    } else console.log('error')
    return result.status
  } catch (error) {
    console.log(error)
  }
}

export async function deleteTeachings(teaching) {
  try {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    }

    const result = await fetch(
      `${BACKEND_LINK}/professors/course?professorId=${teaching.professor.id}&courseId=${teaching.course.id}`,
      requestOptions
    )
    if (result.status == 200) {
      state.value.teachings[teaching.course.id] = state.value.teachings[teaching.course.id].filter(
        (t) => t.id != teaching.professor.id
      )
      return result.status
    } else console.log('error')
  } catch (error) {
    console.log(error)
  }
}

export async function deleteProf(profId) {
  try {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    }

    const result = await fetch(`${BACKEND_LINK}/professors?id=${profId}`, requestOptions)
    if (result.status == 200) {
      state.value.allProfessors = state.value.allProfessors.filter(
        (professor) => professor.id != profId
      )
    } else console.log('error')
    return result.status
  } catch (error) {
    console.log(error)
  }
}

export async function addNewProf(name, surname) {
  var raw = JSON.stringify({
    name: name,
    surname: surname
  })

  var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
  }

  try {
    const result = (await fetch(`${BACKEND_LINK}/professors`, requestOptions))
    if (result.status == 200) {
      const professor = await result.json()
      state.value.allProfessors = [...state.value.allProfessors, professor]
    }
    else throw new Error('error')
  } catch (error) {
    console.log(error)
  }
}

export async function addNewCourse(title) {
  var raw = JSON.stringify({
    name: title
  })

  var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
  }

  try {
    const result = (await fetch(`${BACKEND_LINK}/courses`, requestOptions))
    if (result.status == 200) {
      const course = (await result.json()).course
      state.value.courses = [...state.value.courses, course]
    }
    else throw new Error('error')
  } catch (error) {
    console.log(error)
  }
}

export async function addNewTeaching(prof, course) {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow'
  }

  try {
    const result = await fetch(
      `${BACKEND_LINK}/professors/course?professorId=${prof.id}&courseId=${course.id}`,
      requestOptions
    )

    if (result.status == 200) {
      await getTeachings()
    } else throw new Error('error')
  } catch (error) {
    console.log(error)
  }
}
