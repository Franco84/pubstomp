import axios from 'axios';
import history from '../components/History';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR} from './types';
import {GET_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, DELETE_PROFILE, PROFILE_LOGOUT} from './types';
import {GET_GAMES, FAVORITE_GAME, GET_FAVORITE_GAMES} from './types';

axios.defaults.baseURL = 'http://localhost:8080/api/v1'
axios.defaults.headers.common['token'] = localStorage.getItem('token')

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
        axios.defaults.headers.common['token'] = localStorage.getItem('token')
        history.push('/');
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
        axios.defaults.headers.common['token'] = localStorage.getItem('token')
        history.push('/profile');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function logout() {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['token']
    history.push('/')
    return { type: UNAUTH_USER }
}

export function profileLogout() {
    return { type: PROFILE_LOGOUT }
}

export function getProfile() {
  return function(dispatch) {
    axios.get('/profiles/1')
      .then(response => {
        dispatch({ type: GET_PROFILE, payload:response });
      })
      .catch();
  }
}

export function createProfile(values) {
  return function(dispatch) {
    axios.post('/profiles', values)
      .then(response => {
        dispatch({ type: CREATE_PROFILE, payload:response  })
        history.push('/')
      })
      .catch();
  }
}

export function updateProfile(values, id) {
  return function(dispatch) {
    axios.patch(`/profiles/${id}`, values)
      .then(response => {
        dispatch({ type: UPDATE_PROFILE, payload:response })
        history.push('/')
      })
      .catch();
  }
}

export function uploadAvatar(avatar, id) {
  return function(dispatch) {
    axios.patch(`/profiles/${id}`, avatar)
      .then(response => {
        dispatch({ type: UPDATE_PROFILE, payload:response })
      })
      .catch();
  }
}

export function deleteProfile(profile) {
  const response = axios.delete(`/profiles/${profile.id}`, profile).then((profile) => {
    history.push('/profile')
    return profile.data
  })
  return {
    type: DELETE_PROFILE,
    payload: response
  }
}


export function getGames(value) {
  return function(dispatch) {
    axios.post('/games/search/', value)
      .then(response => {
        dispatch({ type: GET_GAMES, payload:response });
      })
      .catch();
  }
}

export function getFavoriteGames() {
  return function(dispatch) {
    axios.get('/user_games/my_list')
      .then(response => {
        dispatch({ type: GET_FAVORITE_GAMES, payload:response });
      })
      .catch();
  }
}

export function favoriteGame(gameInfo) {
  return function(dispatch) {
    axios.post(`/user_games_toggle`, gameInfo)
      .then(response => {
        dispatch({ type: FAVORITE_GAME, payload:response })
      })
      .catch();
  }
}
