import axios from 'axios';
import history from '../components/History';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

axios.defaults.baseURL = 'http://localhost:8080/api/v1'
axios.defaults.headers.common['token'] = localStorage.getItem('token')

export const LOGIN = 'login'
export const SIGNUP = 'signup'
export const LOGOUT = 'logout'

export const GET_PROFILE = 'getProfile'
export const CREATE_PROFILE = 'createProfile'
export const UPDATE_PROFILE = 'updateProfile'
export const DELETE_PROFILE = 'deleteProfile'

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function login(values) {
  return function(dispatch) {
    axios.post('/login', values)
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/profile');
      })
      .catch(() => {
        dispatch(authError('Incorrect Login Info'));
      });
  }
}

export function signup(values) {
  return function(dispatch) {
    axios.post('/signup', values)
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/profile');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function logout() {
    localStorage.removeItem('token');
    history.push('/');
    return { type: UNAUTH_USER };
}

export function getProfile() {
  const response = axios.get('/profiles').then((profile) => {
    return profile.data[0]
  })
  return {
    type: GET_PROFILE,
    payload: response
  }
}

export function createProfile(profile) {
  const response = axios.post('/profiles', profile).then((profile) => {
    history.push('/profile')
    return profile.data
  })
  return {
    type: CREATE_PROFILE,
    payload: response
  }
}

export function updateProfile(profile, id) {
  const response = axios.patch(`/profiles/${id}`, profile).then((profile) => {
    history.push('/profile')
    return profile.data
  })
  return {
    type: UPDATE_PROFILE,
    payload: response
  }
}

export function deleteProfile(profile) {
  debugger
  const response = axios.delete(`/profiles/${profile.id}`, profile).then((profile) => {
    history.push('/profile')
    return profile.data
  })
  return {
    type: DELETE_PROFILE,
    payload: response
  }
}
