import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import {addRecipe} from '../_actions/recipes';

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
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleIngredientChange(ingredient, i, event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // make a copy
    let ingredients = this.state.ingredients.slice();
    ingredients[i] = {
      ...ingredients[i],
      [name]: value
    }

    this.setState({
      ingredients
    });
  }

  addIngredient(){
    let ingredients = this.state.ingredients.slice();
    ingredients.push(BLANK_INGREDIENT);
    this.setState({
      ingredients
    });
  }

  removeIngredient(i){
    let ingredients = this.state.ingredients.slice();
    ingredients.splice(i, 1);
    this.setState({
      ingredients
    });
  }
  handleSubmit(e){
    e.preventDefault();
    
    const { dispatch, authUser } = this.props;

    dispatch(addRecipe(authUser, this.state));
  }

  render() {
    return (
      <Fragment>
        <h1>Create Recipe</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label htmlFor="recipename">
              <span>Name</span>
              <input type="text" name="recipename" onChange={this.handleInputChange.bind(this)} />
            </label>
          </div>
          <div>
            <label>
              <span>Ingredients</span>
              {this.state.ingredients.map((ingredient, i) => (
                <div key={i}>
                  <input type="text" name="measure" onChange={this.handleIngredientChange.bind(this, ingredient, i)} />
                  <input type="text" name="name" onChange={this.handleIngredientChange.bind(this, ingredient, i)} />
                  <input type="text" name="instruction" onChange={this.handleIngredientChange.bind(this, ingredient, i)} />
                  <input type="button" value="Remove" onClick={this.removeIngredient.bind(this)} disabled={this.state.ingredients.length === 1} />
                </div>
              ))}
              <input type="button" value="Add" onClick={this.addIngredient.bind(this)} />
            </label>
          </div>
          <div>
            <label htmlFor="ingredients">
              <span>Instructions</span>
              <textarea name="instructions" onChange={this.handleInputChange.bind(this)} />
            </label>
          </div>
          <div>
            <input type="submit" value="Create" />
          </div>
        </form>
      </Fragment>);
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(CreatePage);
