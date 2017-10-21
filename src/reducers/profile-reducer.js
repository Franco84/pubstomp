import {GET_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, DELETE_PROFILE, PROFILE_LOGOUT} from '../actions/index'

export default (state=[], action) => {
  switch (action.type) {
    case GET_PROFILE:
      debugger
      return action.payload.data
    case CREATE_PROFILE:
      return action.payload.data
    case UPDATE_PROFILE:
      return action.payload.data
    case DELETE_PROFILE:
      return action.payload
    case PROFILE_LOGOUT:
        state = []
        return state
    default:
      return state
  }
}
