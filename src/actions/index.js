import axios from 'axios';
import history from '../components/History'
import { SubmissionError } from 'redux-form'

axios.defaults.baseURL = 'http://localhost:8080/api/v1'
axios.defaults.headers.common['JWT'] = sessionStorage.getItem('JWT')

export const LOGIN = 'login'
export const SIGNUP = 'signup'
export const LOGOUT = 'logout'

export const GET_PROFILE = 'getProfile'
export const CREATE_PROFILE = 'createProfile'
export const UPDATE_PROFILE = 'updateProfile'
export const DELETE_PROFILE = 'deleteProfile'

export function login(values) {
  const response = axios.post('/login', values)
  .then((user) => {
    sessionStorage.setItem('JWT', user.data.token)
    axios.defaults.headers.common['JWT'] = user.data.token
    history.push('/')
    return user
  })
  .catch((error) => {
      throw new SubmissionError('Login failed!')
  })
  return {
      type: LOGIN,
      payload: response
    }
  }

export function signup(values) {
  const response = axios.post('/signup', values).then((user) => {
    sessionStorage.setItem('JWT', user.data.JWT)
    axios.defaults.headers.common['JWT'] = user.data.JWT
    history.push('/profile')
    return user
    })
  return {
      type: SIGNUP,
      payload: response
    }
  }


export function logout() {
  sessionStorage.removeItem('JWT')
  history.push('/')
  return {
    type: LOGOUT,
    payload: []
  }
}

export function getProfile() {
  const response = axios.get('/profiles').then((profile) => {
    return profile.data
  })
  return {
    type: 'FETCH_PROFILE',
    payload: response
  }
}

export function createProfile(profile) {
  const response = axios.post('/profiles', {profile}).then((profile) => {
    return profile.data
  })
  return {
    type: 'CREATE_PROFILE',
    payload: response
  }
}

export function updateProfile(profile) {
  const response = axios.patch(`/profiles/${profile.id}`, {profile}).then((profileData) => {
    return profileData.data
  })
  return {
    type: 'UPDATE_PROFILE',
    payload: response
  }
}

export function deleteProfile(profile) {
  const response = axios.delete(`/profiles/${profile.id}`, {profile}).then((profile) => {
    return profile.data
  })
  return {
    type: 'DELETE_PROFILE',
    payload: response
  }
}
