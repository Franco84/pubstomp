import {LOGIN, SIGNUP, LOGOUT} from '../actions/index'

const initialState = {
  loggedIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return action.payload
    case LOGIN:
    debugger
      return Object.assign({}, state, { loggedIn: true})
    case LOGOUT:
      return Object.assign({}, state, { loggedIn: false})
    default:
      return state
  }
}
