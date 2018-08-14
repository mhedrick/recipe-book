import React from 'react';
import { shallow } from 'enzyme';
import { RecipeList } from './RecipesList';

describe('RecipesList', () => {
    it('renders without crashing', () => {
        shallow(<RecipeList />);
    });
    it('renders without crashing when given recipes', () => {
        let recipes = {
            'key1': {
                recipeid: 'key1',
                recipename: 'name1'
            }
        }

        shallow(<RecipeList recipes={recipes} />);
    });
    it('does not render when recipes is undefined', () => {
        let list = <ul></ul>;

        let wrapper = shallow(<RecipeList />);
        expect(wrapper.contains(list)).not.toEqual(true);
    });
    it('does not render when there are no recipes', () => {
        let list = <ul></ul>;

        let wrapper = shallow(<RecipeList recipes={{}} />);
        expect(wrapper.contains(list)).not.toEqual(true);
    });
    it('renders a list when there are recipes', () => {
        let recipes = {
            'key1': {
                recipeid: 'key1',
                recipename: 'name1'
            },
            'key2': {
                recipeid: 'key1',
                recipename: 'name1'
            }
        }

        let wrapper = shallow(<RecipeList recipes={recipes} />);
        expect(wrapper.find('li').length).toEqual(Object.keys(recipes).length);
    });
});