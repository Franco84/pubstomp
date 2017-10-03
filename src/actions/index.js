import axios from 'axios';
import history from '../components/History'
import { SubmissionError } from 'redux-form'

axios.defaults.baseURL = 'http://localhost:8080/api/v1'
axios.defaults.headers.common['JWT'] = sessionStorage.getItem('JWT')

export const LOGIN = 'login'
export const SIGNUP = 'signup'
export const LOGOUT = 'logout'

export function login(values) {
  const response = axios.post('/login', values)
  .then((user) => {
    sessionStorage.setItem('JWT', user.data.token)
    axios.defaults.headers.common['JWT'] = user.data.token
    history.push('/')
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
    sessionStorage.setItem('JWT', user.data.jwt)
    axios.defaults.headers.common['JWT'] = user.data.jwt
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
  return {
    type: LOGOUT,
    payload: []
  }
}
