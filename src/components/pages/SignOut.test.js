import React from 'react';
import { shallow } from 'enzyme';
import SignOutButton  from './SignOut';

describe('RecipeView Page', () => {
    it('renders without crashing', () => {
        shallow(<SignOutButton auth={{ doSignOut: () => {}}} />);
    });
});