import {LOGIN, SIGNUP, LOGOUT} from '../actions/index'

export default (state=[], action) => {
  switch (action.type) {
    case SIGNUP:
      return action.payload
    case LOGIN:
    debugger
      return action.payload
    case LOGOUT:
      return action.payload
    default:
      return state
  }
}
