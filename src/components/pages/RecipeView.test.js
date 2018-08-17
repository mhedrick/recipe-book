import React from 'react';
import { shallow } from 'enzyme';
import { ViewPage } from './RecipeView';

describe('RecipeView Page', () => {
    var props;
    beforeEach(() => {
        props = {
            recipe: {
                recipeid: true,
                instructions: [],
                ingredients: [],
                name: ""
            },
            onComponentDidMount: jest.fn()
        }
    });

    it('renders without crashing', () => {
        shallow(<ViewPage {...props}/>);
    });
    it('calls for a recipe when loading', () => {
        shallow(<ViewPage  {...props}/>);

        expect(props.onComponentDidMount).toBeCalled();
    });
    it('renders ingredients if given any', () => {
        props.recipe.ingredients = [{
            measure: true,
            name: true,
            instruction: true
        }];
        let wrapper = shallow(<ViewPage  {...props}/>);

        expect(wrapper.find('li').length).toEqual(1);
    });
});