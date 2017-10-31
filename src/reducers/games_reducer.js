import {GET_GAMES, FAVORITE_GAME, GET_FAVORITE_GAMES} from '../actions/types'

export default (state=[], action) => {
  switch (action.type) {
    case GET_GAMES:
      return action.payload.data
    case FAVORITE_GAME:
      return action.payload.data
    case GET_FAVORITE_GAMES:
      return action.payload.data
    default:
      return state
  }
}
