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
  onHandleDeleteClick(id){
    const { dispatch, authUser } = this.props;

    dispatch(deleteRecipe(authUser, id));
  }
  render() {
    const { recipes } = this.props;
    return (
      <div>
        <h1>Home Page</h1>
        {recipes.length > 0 && (
          <ul>
            {recipes.map((recipeIds) => {
              const recipeId = Object.keys(recipeIds)[0];
              return (
                <li key={recipeId}>
                  <Link to={`/recipe/${recipeId}`}>{recipeIds[recipeId].recipename}</Link>
                  <button type="button" onClick={this.onHandleDeleteClick.bind(this, recipeId)} >X</button>
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
