import React from 'react';
import { shallow } from 'enzyme';
import { SignInPage } from './SignIn';
import SignInForm from '../forms/SignInForm';
import { PasswordForgetLink } from './PasswordForget';

describe('RecipeView Page', () => {

    it('renders without crashing', () => {
        shallow(<SignInPage />);
    });
    it('renders a password forget link', () => {
        let wrapper = shallow(<SignInPage />);

        expect(wrapper.contains(<PasswordForgetLink />)).toEqual(true);
    });
    it('renders a sign in form', () => {
        let wrapper = shallow(<SignInPage history={{}} />);

        expect(wrapper.contains(<SignInForm history={{}} />)).toEqual(true);
    });
});