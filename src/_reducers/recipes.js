
const INITIAL_STATE = {
    isFetching: false,
    items: [],
};

function recipesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RECEIVE_RECIPES': {
            return Object.assign({}, state, {
                isFetching: false,
                items: action.recipes
            });
        }
        case 'RECEIVE_RECIPE': {
            return Object.assign({}, state, {
                isFetching: false,
                items: [
                    ...state.items,
                    action.recipe
                ]
            });
        }
        default: return state;
    }
}

export default recipesReducer;