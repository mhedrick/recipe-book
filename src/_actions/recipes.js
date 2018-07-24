


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