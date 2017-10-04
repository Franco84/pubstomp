import {GET_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, DELETE_PROFILE} from '../actions/index'

export default (state=[], action) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload
    case CREATE_PROFILE:
      return action.payload
    case UPDATE_PROFILE:
      return action.payload
    case DELETE_PROFILE:
      return action.payload
    default:
      return state
  }
}
