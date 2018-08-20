
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
            // add to items list
            const { recipe } = action;
            const { recipeid } = recipe;
            let items = state.items;
            items[recipeid] = recipe;

            return Object.assign({}, state, {
                isFetching: false,
                items
            });
        }
        default: return state;
    }
}

export default recipesReducer;