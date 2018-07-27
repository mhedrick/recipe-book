import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';

import withAuthorization from './withAuthorization';
import {addRecipe} from '../_actions/recipes';
import RecipeForm from './RecipeForm';

const BLANK_INGREDIENT = 
{
  measure: "",
  name: "",
  instruction: ""
};

class CreatePage extends Component {
  state = {
    recipename: "",
    instructions: "",
    ingredients: [ BLANK_INGREDIENT ]
  }
  handleSubmit(recipe){
    const { dispatch, authUser, history } = this.props;

    dispatch(addRecipe(authUser, recipe, history));
  }

  render() {
    return (
      <Fragment>
        <h1>Create Recipe</h1>
        <RecipeForm recipe={this.state} onHandleSubmit={this.handleSubmit.bind(this)} {...this.props} />
      </Fragment>);
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  withRouter,
  connect(mapStateToProps)
)(CreatePage);
