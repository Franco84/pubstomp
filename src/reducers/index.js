import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import authReducer from './auth_reducer'
import profileReducer from './profile-reducer'

const rootReducer = combineReducers({
  form: reducerForm,
  auth: authReducer,
  profile: profileReducer,
  state: (state = {}) => state
});

export default rootReducer;
