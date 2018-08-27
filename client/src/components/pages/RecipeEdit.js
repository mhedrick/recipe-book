import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';

import withAuthorization from '../../hoc/withAuthorization';
import { updateRecipe, fetchRecipeIfNeeded } from '../../_actions/recipes';
import RecipeForm from '../forms/RecipeForm';


export class EditPage extends Component {
    componentDidMount() {
        const { onComponentDidMount } = this.props;
        
        onComponentDidMount();
    }
    handleSubmit = (recipe) => {
        const { onHandleSubmit } = this.props;

        onHandleSubmit(recipe);
    }

    render() {
        const { recipe } = this.props;
        return (
            <Fragment>
                <h2>Edit Recipe</h2>
                { recipe.recipeid && <RecipeForm handleSubmit={handleSubmit} {...this.props} /> }
            </Fragment>);
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    recipe: state.selectedRecipe
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onComponentDidMount: () => dispatch(fetchRecipeIfNeeded(ownProps.match.params.id)),
    onHandleSubmit: (recipe) => dispatch(updateRecipe(recipe, ownProps.authUser, ownProps.history))
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(EditPage);
