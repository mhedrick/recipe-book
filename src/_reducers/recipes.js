
const INITIAL_STATE = {
    isFetching: false,
    items: [],
};

function recipesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'RECEIVE_POSTS': {
            return Object.assign({}, state, {
                isFetching: false,
                items: action.recipes
            });
        }
        default: return state;
    }
}

export default recipesReducer;