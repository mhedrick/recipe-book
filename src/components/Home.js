import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { fetchRecipes, deleteRecipe, selectRecipe } from '../_actions/recipes';
import { Link } from 'react-router-dom'

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
  onHandleSelectClick(recipe){
    const { dispatch } = this.props;

    dispatch(selectRecipe(recipe));
  }
  render() {
    const { recipes } = this.props;
    return (
      <div>
        <h1>Home Page</h1>
        {Object.keys(recipes).length > 0 && (
          <ul>
            { Object.keys(recipes).map((recipeId) => {
              return (
                <li key={recipeId}>
                  <Link to={`/recipe/${recipeId}`}>{recipes[recipeId].recipename}</Link>
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
