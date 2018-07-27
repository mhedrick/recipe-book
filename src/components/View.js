import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'

import { fetchRecipeIfNeeded } from '../_actions/recipes';
import withAuthorization from './withAuthorization';


class ViewPage extends Component {

    componentDidMount() {
        const { match, dispatch } = this.props;
        dispatch(fetchRecipeIfNeeded(match.params.id));
    }
    onHandleEditClick() {
        // new page or flip inputs??
        // leaning towards new page as create/edit component
    }
    render() {
        const { recipename, ingredients, instructions, recipeid } = this.props.recipe;
        return (
            <div>
                <h1>{recipename}</h1>
                  <Link to={`/recipe/${recipeid}/edit`}>Edit</Link>
                <h2>Ingredients</h2>
                <ul>
                    {ingredients && ingredients.map((ingredient, i) => 
                        <li key={i}>{ingredient.measurement} <b>{ingredient.name}</b> <i>{ingredient.instruction}</i></li>
                    )}
                </ul>
                <h2>Instructions</h2>
                <p>{instructions /* will be markdown */}</p>
            </div>);
    }
}


const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    recipe: state.selectedRecipe
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    withRouter,
    connect(mapStateToProps)
)(ViewPage);
