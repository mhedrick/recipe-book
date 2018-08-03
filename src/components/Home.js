import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { fetchRecipes, selectRecipe } from '../_actions/recipes';
import { Link } from 'react-router-dom'

import withAuthorization from './withAuthorization';

class HomePage extends Component {
  componentDidMount() {
    const { dispatch, authUser } = this.props;

    dispatch(fetchRecipes(authUser));
  }
  onHandleSelectClick(recipe){
    const { dispatch } = this.props;

    dispatch(selectRecipe(recipe));
  }
  render() {
    const { recipes } = this.props;
    return (
    <div>
        <h2>Your recipes</h2>
        {recipes && Object.keys(recipes).length > 0 && (
          <ul>
            { Object.keys(recipes).map((recipeid) => {
              return (
                <li key={recipeid}>
                  <Link to={`/recipe/${recipeid}`}>{recipes[recipeid].recipename}</Link>
                </li>)
            })}
          </ul>)}
        {recipes && recipes.length === 0 && <p>No recipes.</p>}
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
