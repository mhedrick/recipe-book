import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { fetchRecipes } from '../_actions/recipes';

import withAuthorization from './withAuthorization';

class HomePage extends Component {
  componentDidMount() {
    const { dispatch, authUser } = this.props;

    dispatch(fetchRecipes(authUser));
  }
  render() {
    const { recipes } = this.props;
    return (
      <div>
        <h1>Home Page</h1>
        {recipes.length > 0 && (
          <ul>
            {recipes.map((id) => {
              const recipeId = Object.keys(id)[0];
              return (
                <li key={recipeId}>
                  <a href={`/recipe/${recipeId}`}>{id[recipeId].recipename}</a>
                </li>)
            })}
          </ul>)}
        {recipes.length === 0 && <p>No recipes.</p>}
      </div>)
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  recipes: state.recipesState.items
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(HomePage);
