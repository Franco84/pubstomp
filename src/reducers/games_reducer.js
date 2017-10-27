import {GET_GAMES, UPDATE_GAMES} from '../actions/types'

export default (state={}, action) => {
  switch (action.type) {
    case GET_GAMES:
      return action.payload.data
    case UPDATE_GAMES:
      return action.payload.data
    default:
      return state
  }
}
