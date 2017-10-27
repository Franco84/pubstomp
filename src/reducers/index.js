import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import authReducer from './auth_reducer'
import profileReducer from './profile_reducer'
import gamesReducer from './games_reducer'

const rootReducer = combineReducers({
  form: reducerForm,
  auth: authReducer,
  profile: profileReducer,
  games: gamesReducer,
  state: (state = {}) => state
});

export default rootReducer;
