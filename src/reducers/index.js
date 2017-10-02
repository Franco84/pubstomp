import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import userReducer from './user-reducer'

const rootReducer = combineReducers({
  form: reducerForm,
  currentUser: userReducer,
  state: (state = {}) => state
});

export default rootReducer;
