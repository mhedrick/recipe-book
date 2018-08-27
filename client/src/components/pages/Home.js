import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { fetchRecipes, selectRecipe } from '../../_actions/recipes';
import RecipesList from '../RecipesList';

import withAuthorization from '../../hoc/withAuthorization';

export class HomePage extends Component {
  componentDidMount() {
    const { authUser, onFetchRecipe } = this.props;

    onFetchRecipe(authUser);
  }
  render() {
    const { recipes } = this.props;
    return (
    <div>
        <h2>Your recipes</h2>
        {recipes && <RecipesList recipes={recipes} />}
        {recipes == null || recipes.length === 0 && <p>No recipes.</p>}
      </div>)
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  recipes: state.recipesState.items
});

const mapDispatchToProps = (dispatch)=> ({
  onFetchRecipe: (authUser) => dispatch(fetchRecipes(authUser))
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
