


function requestRecipes(userId) {
    return {
        type: "REQUEST_RECIPES",
        userId
    }
};

function receiveRecipes(userId, recipes) {
    return {
        type: "RECEIVE_RECIPES",
        userId,
        recipes,
        receivedAt: Date.now()
    }
};

function receiveRecipe(recipe) {
    return {
        type: "RECEIVE_RECIPES",
        recipe,
        receivedAt: Date.now()
    }
};

export const selectRecipe = (recipe) => {
    return {
        type: "SELECT_RECIPE",
        recipe
    }
}

export const fetchRecipes = (authUser) => {
    return (dispatch) => {
        dispatch(requestRecipes(authUser.uid));
        authUser.getIdToken().then((idToken) => {
            return fetch(`/api/v1/users/${authUser.uid}/recipes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `bearer ${idToken}`
                }
            })
                .then(response => response.json())
                .then(json => dispatch(receiveRecipes(authUser.uid, json)));
        });
    }
}

export const fetchRecipeIfNeeded = (recipeId) => {
    return (dispatch, getState) => {
        if (getState().recipesState.items && getState().recipesState.items[recipeId] != null) {
            dispatch(selectRecipe(getState().recipesState.items[recipeId]))
        } else {
            dispatch(fetchRecipe(getState().sessionState.authUser, recipeId));
        }
    }
}

const fetchRecipe = (authUser, recipeId) => {
    return (dispatch) => {
            authUser.getIdToken().then((idToken) => {
                return fetch(`/api/v1/recipes/${recipeId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Authorization": `bearer ${idToken}`
                    }
                })
                    .then(response => response.json())
                    .then(json => dispatch(selectRecipe(json)));
            });
        }
}

export const addRecipe = (recipe, authUser, history) => {
    const { recipename, ingredients, instructions } = recipe;
    return (dispatch) => {
        authUser.getIdToken().then((idToken) => {
            return fetch("/api/v1/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `bearer ${idToken}`
                },
                body: JSON.stringify({
                    uid: authUser.uid,
                    recipename,
                    ingredients,
                    instructions
                })
            })
                .then(response => response.json())
                .then(json => {
                    dispatch(receiveRecipe(json));
                    history.push(`/recipe/${json.recipeid}`);
                });
        });
    };
};


export const updateRecipe = (recipe, authUser, history) => {
    const { recipeid, recipename, ingredients, instructions } = recipe;
    return (dispatch) => {
        authUser.getIdToken().then((idToken) => {
            return fetch(`/api/v1/recipes/${recipeid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `bearer ${idToken}`
                },
                body: JSON.stringify({
                    uid: authUser.uid,
                    recipename,
                    ingredients,
                    instructions
                })
            })
                .then(response => response.json())
                .then(json => {
                    dispatch(receiveRecipe(json));
                    history.push(`/recipe/${json.recipeid}`);
                });
        });
    };
};

export const deleteRecipe = (authUser, recipeId) => {
    return (dispatch) => {
        authUser.getIdToken().then((idToken) => {
            return fetch(`/api/v1/recipes/${recipeId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `bearer ${idToken}`
                }
            })
                .then(response => response.json());
        });
    };
};