import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import recipesReducer from './recipes';
import selectedRecipeReducer from './selectedRecipe';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  recipesState: recipesReducer,
  selectedRecipe: selectedRecipeReducer
});

export default rootReducer;