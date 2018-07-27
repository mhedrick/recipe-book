import React, { Component } from 'react';

const BLANK_INGREDIENT =
{
    measure: "",
    name: "",
    instruction: ""
};

class RecipeForm extends Component {
    constructor(props) {
        super(props);

        let { recipename, ingredients, instructions, recipeid } = this.props.recipe;
        if (!ingredients || ingredients.length === 0) {
            ingredients = [
                BLANK_INGREDIENT
            ]
        }
        this.state = {
            recipename,
            ingredients,
            instructions,
            recipeid
        }
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
    addIngredient() {
        let ingredients = this.state.ingredients.slice();
        ingredients.push(BLANK_INGREDIENT);
        this.setState({
            ingredients
        });
    }
    removeIngredient(i) {
        let ingredients = this.state.ingredients.slice();
        ingredients.splice(i, 1);
        this.setState({
            ingredients
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { onHandleSubmit } = this.props;

        onHandleSubmit(this.state);
    }
    render() {
        let { recipename, ingredients, instructions } = this.state;
        return (
            <form onSubmit={this.handleSubmit.bind(this)} >
                <div>
                    <label htmlFor="recipename">
                        <span>Name</span>
                        <input type="text" name="recipename" value={recipename} onChange={this.handleInputChange.bind(this)} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Ingredients</span>
                        <div className="row">
                            <div className="column">Amount </div>
                            <div className="column"> Ingredient</div>
                            <div className="column">Instruction (optional)</div>
                            <div className="column"> </div>
                        </div>
                        {ingredients.map((ingredient, i) => (
                            <div className="row" key={i}>
                                <div className="column">
                                    <input 
                                    type="text" 
                                    name="measure" 
                                    placeholder="3 cups"
                                    value={ingredient.measure} 
                                    onChange={this.handleIngredientChange.bind(this, ingredient, i)} />
                                </div>
                                <div className="column">
                                    <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="banana"
                                    value={ingredient.name} 
                                    onChange={this.handleIngredientChange.bind(this, ingredient, i)} />
                                </div>
                                <div className="column">
                                    <input 
                                    type="text" 
                                    name="instruction" 
                                    placeholder="mashed"
                                    value={ingredient.instruction} 
                                    onChange={this.handleIngredientChange.bind(this, ingredient, i)} />
                                </div>
                                <div className="column">
                                    <input type="button" value="Remove" onClick={this.removeIngredient.bind(this)} disabled={this.state.ingredients.length === 1} />
                                </div>
                            </div>
                        ))}
                        <input type="button" value="Add Another Ingredient" onClick={this.addIngredient.bind(this)} />
                    </label>
                </div>
                <div>
                    <label htmlFor="ingredients">
                        <span>Instructions</span>
                        <textarea name="instructions" value={instructions} onChange={this.handleInputChange.bind(this)} />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Save" />
                </div>
            </form>)
    }
};

export default RecipeForm;