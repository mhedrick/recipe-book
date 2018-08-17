import React, { Component } from 'react';
import {findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'

import { fetchRecipeIfNeeded, deleteRecipe } from '../../_actions/recipes';
import withAuthorization from '../../hoc/withAuthorization';

export class ViewPage extends Component {
    componentDidMount() {
        const { onComponentDidMount } = this.props;
        onComponentDidMount();
    }
    componentWillUpdate({ recipe }){
        let frag = document.createRange().createContextualFragment(recipe.instructions);
        let appendTarget = findDOMNode(this.refs.instructions); 
        appendTarget.appendChild(frag);
    }
    render() {
        const { recipename, ingredients, recipeid } = this.props.recipe;
        const { onHandleDeleteClick } = this.props;
        return (
            <div>
                <Link to={`/home`}>{"<"} Go Back</Link>
                <h2>
                    {recipename}{' '}
                    <small style={{ fontSize: '2.2rem'}}><Link to={`/recipe/${recipeid}/edit`}>edit</Link>
                  {" | "}
                  <a onClick={onHandleDeleteClick}>delete</a></small>
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
const mapDispatchToProps = (dispatch, ownProps) => ({
    onHandleDeleteClick: () => dispatch(deleteRecipe(authUser, props.recipe.recipeid)),
    onComponentDidMount: () => dispatch(fetchRecipeIfNeeded(ownProps.match.params.id))
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ViewPage);
