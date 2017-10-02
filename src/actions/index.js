import axios from 'axios';

const ROOT_URL = 'http://localhost:8080/api/v1'

export const LOGIN = 'login'
export const SIGNUP = 'signup'

export function login(values) {
  const request = axios.post(`${ROOT_URL}/login`, values)

  return {
    type: LOGIN,
    payload: request
  }
}

export function signup(values) {
  const request = axios.post(`${ROOT_URL}/signup`, values)

  return {
    type: SIGNUP,
    payload: request
  }
}
