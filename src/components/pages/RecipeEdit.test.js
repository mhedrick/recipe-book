import React from 'react';
import { shallow } from 'enzyme';
import { EditPage } from './RecipeEdit';
import RecipeForm from '../forms/RecipeForm';

describe('RecipeEdit Page', () => {
    var props;
    beforeEach(() => {
        props = {
            recipe: {
                recipeid: true
            },
            match: {
                params: {
                    id: 1
                }
            },
            onComponentDidMount: jest.fn(),
            onHandleSubmit: jest.fn()
        }
    });

    it('renders without crashing', () => {
        shallow(<EditPage {...props}/>);
    });
    it('renders recipe form if given a recipe', () => {
        const wrapper = shallow(<EditPage  {...props}/>);

        expect(wrapper.find(RecipeForm).length).toEqual(1);
    });
    it('does not render recipe form if given a recipe', () => {
        props.recipe.recipeid = false;
        const wrapper = shallow(<EditPage  {...props}/>);

        expect(wrapper.find(RecipeForm).length).toEqual(0);
    });
    it('calls for a recipe when loading', () => {
        shallow(<EditPage  {...props}/>);

        expect(props.onComponentDidMount).toBeCalled();
    });
});