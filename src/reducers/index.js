import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import userReducer from './user-reducer'
import profileReducer from './profile-reducer'

const rootReducer = combineReducers({
  form: reducerForm,
  currentUser: userReducer,
  profile: profileReducer,
  state: (state = {}) => state
});

export default rootReducer;
