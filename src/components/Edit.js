import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';

import withAuthorization from './withAuthorization';
import { updateRecipe, fetchRecipeIfNeeded } from '../_actions/recipes';
import RecipeForm from './RecipeForm';


class EditPage extends Component {
    componentDidMount() {
        const { match, dispatch } = this.props;
        dispatch(fetchRecipeIfNeeded(match.params.id));
    }
    handleSubmit(recipe) {
        const { dispatch, authUser, history } = this.props;

        dispatch(updateRecipe(authUser, recipe, history));
    }

    render() {
        return (
            <Fragment>
                <h2>Edit Recipe</h2>
                { this.props.recipe.recipeid && <RecipeForm onHandleSubmit={this.handleSubmit.bind(this)} {...this.props} /> }
            </Fragment>);
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
)(EditPage);
