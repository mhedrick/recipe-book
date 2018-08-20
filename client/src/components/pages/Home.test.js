import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from './Home';
import { RecipeList } from '../RecipesList';

describe('HomePage', () => {
    var props;
    beforeEach(()=>{
        props = {
            authUser: true,
            recipes: true,
            onFetchRecipe: jest.fn()
        };
    });
    it('renders without crashing', () => {
        shallow(<HomePage {...props}/>);
    });
    it('calls onFetchRecipe when the component mounts', () => {
        shallow(<HomePage {...props}/>);
        expect(props.onFetchRecipe).toBeCalled();
    });
    it('renders nothing when not given recipes', () => {
        props.recipes = false;
        let wrapper = shallow(<HomePage {...props}/>);

        expect(wrapper.contains(<RecipeList />)).not.toEqual(true);
        expect(wrapper.contains(<p>No recipes</p>)).not.toEqual(true);
    });
    it('renders a recipes list when given recipes', () => {
        let wrapper = shallow(<HomePage {...props}/>);

        expect(wrapper.contains(<RecipeList recipes={props.recipes} />)).toEqual(true);
    });
    it('renders a "no recipes" when given no recipes', () => {
        props.recipes = [];
        let wrapper = shallow(<HomePage {...props} />);

        expect(wrapper.find('p').length).toEqual(1);
    });
});