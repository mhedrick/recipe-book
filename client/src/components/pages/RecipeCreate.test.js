import React from 'react';
import { shallow } from 'enzyme';
import { CreatePage } from './RecipeCreate';
import RecipeForm from '../forms/RecipeForm';

describe('PasswordForget Page', () => {
    it('renders without crashing', () => {
        shallow(<CreatePage/>);
    });
    it('renders recipe form', () => {
        let wrapper = shallow(<CreatePage/>);

        expect(wrapper.find(RecipeForm).length).toEqual(1);
    });
});