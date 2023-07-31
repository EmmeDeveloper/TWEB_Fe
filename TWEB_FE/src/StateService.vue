<!-- https://vuejs.org/guide/components/provide-inject.html#inject -->
<script>
import { provide, ref, inject } from "vue";
import { PAGE_HOME } from './constants';
import { BACKEND_LINK } from './environment'


const userData = {
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
};

const courses = [
  {
    title: 'Programmazione 1',
    id: '1'
  },
  {
    title: 'Algoritmi',
    id: '2'
  },
  {
    title: 'Database',
    id: '3'
  }
]


const state = ref({
  userData: userData,
  currentPage: PAGE_HOME,
  courses: courses
});

export function initStore() {
  provide('state', state);
  return state;
}

export function useStore() {
  return inject('state');
}

export function updatePage(p) {
  state.value.currentPage = p;
}

export function updateUser(p) {
  state.value.userData = p;
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
      redirect: 'follow',
    }

    const result = await fetch(`${BACKEND_LINK}/login`, requestOptions);

  // Step 1: Extract JSESSIONID value from the given string
    // const inputString = result.headers.get('session');
    // const match = inputString.match(/JSESSIONID=([^;]+)/);
    // const JSESSIONID = match ? match[1] : null;
    // console.log(JSESSIONID);

    // // Step 2: Set the vue3 cookie
    // document.cookie = `JSESSIONID=${JSESSIONID}`;

    const data = await result.json();
    console.log(result);
    return data.user;
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
    const response = await fetch(`${BACKEND_LINK}/courses`);
    const data = await response.json();
    state.value.courses = data.courses;
  } catch (error) {
    console.log(error);
  }
}


export async function addSessionID(options) {
  if (!options.headers) options.headers = {};
  options.headers['JSESSIONID'] = document.cookie;
  console.log(options.headers);
}



</script>
