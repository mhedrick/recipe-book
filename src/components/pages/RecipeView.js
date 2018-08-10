import React, { Component } from 'react';
import {findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'

import { fetchRecipeIfNeeded, deleteRecipe } from '../../_actions/recipes';
import withAuthorization from '../../hoc/withAuthorization';


class ViewPage extends Component {

    componentDidMount() {
        const { match, dispatch } = this.props;
        dispatch(fetchRecipeIfNeeded(match.params.id));
    }
    componentWillUpdate({ recipe }){
        let frag = document.createRange().createContextualFragment(recipe.instructions);
        let appendTarget = findDOMNode(this.refs.instructions); 
        appendTarget.appendChild(frag);
    }
    onHandleDeleteClick = () => {
      const { dispatch, authUser, recipe } = this.props;
  
      dispatch(deleteRecipe(authUser, recipe.recipeid));
    }
    render() {
        const { recipename, ingredients, recipeid } = this.props.recipe;
        return (
            <div>
                <Link to={`/home`}>{"<"} Go Back</Link>
                <h2>
                    {recipename}{' '}
                    <small style={{ fontSize: '2.2rem'}}><Link to={`/recipe/${recipeid}/edit`}>edit</Link>
                  {" | "}
                  <a onClick={this.onHandleDeleteClick}>delete</a></small>
                </h2>
                  
                <h4>Ingredients</h4>
                <ul>
                    {ingredients && ingredients.map((ingredient, i) => 
                        <li key={i}>{ingredient.measure} <b>{ingredient.name}</b> <i>{ingredient.instruction}</i></li>
                    )}
                </ul>
                <h4>Instructions</h4>
                <p ref="instructions"></p>
            </div>);
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
)(ViewPage);
