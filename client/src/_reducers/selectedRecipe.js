
const INITIAL_STATE = {
  recipeId: {}
};

function selectedRecipeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
      case 'SELECT_RECIPE': {
          return action.recipe
      }
      default: return state;
  }
}

export default selectedRecipeReducer;