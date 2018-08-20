import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';

import withAuthorization from '../../hoc/withAuthorization';
import {addRecipe} from '../../_actions/recipes';
import RecipeForm from '../forms/RecipeForm';

const BLANK_INGREDIENT = 
{
  measure: "",
  name: "",
  instruction: ""
};

export class CreatePage extends Component {
  state = {
    recipename: "",
    instructions: "",
    ingredients: [ BLANK_INGREDIENT ]
  }
  handleSubmit(recipe){
    const { onSubmitRecipe, authUser, history } = this.props;

    onSubmitRecipe(authUser, recipe, history);
  }

  render() {
    return (
      <Fragment>
        <h3>Create Recipe</h3>
        <RecipeForm recipe={this.state} onHandleSubmit={this.handleSubmit.bind(this)} {...this.props} />
      </Fragment>);
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});
const mapDispatchToProps = (dispatch) => ({
  onSubmitRecipe: (authUser, recipe, history) => dispatch(addRecipe(authUser, recipe, history))
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CreatePage);
