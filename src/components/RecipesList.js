import React from 'react';
import { Link } from 'react-router-dom'

const RecipeList = ({ recipes }) => Object.keys(recipes).length > 0 && (
    <ul>
        {Object.keys(recipes).map((recipeid) => {
            return (
                <li key={recipeid}>
                    <Link to={`/recipe/${recipeid}`}>{recipes[recipeid].recipename}</Link>
                </li>)
        })}
    </ul>)

export default RecipeList;