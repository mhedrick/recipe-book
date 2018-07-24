import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import recipesReducer from './recipes';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  recipesState: recipesReducer
});

export default rootReducer;