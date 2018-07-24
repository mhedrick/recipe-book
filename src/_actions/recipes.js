


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
function receiveRecipe(userId, recipe) {
    return {
        type: "RECEIVE_RECIPE",
        userId,
        recipe,
        receivedAt: Date.now()
    }
};

export const fetchRecipes = (authUser) => {
    return (dispatch) => {
        dispatch(requestRecipes(authUser.uid));
        authUser.getIdToken().then((idToken) => {
            return fetch(`http://localhost:5000/api/v1/users/${authUser.uid}/recipes`, {
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

export const addRecipe = (authUser, recipe) => {
    const { recipename, ingredients, instructions } = recipe;
    return (dispatch) => {
        authUser.getIdToken().then((idToken) => {
            return fetch("http://localhost:5000/api/v1/recipes", {
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
                .then(json => dispatch(receiveRecipe(authUser.uid, json)));
        });
    }
}