import React from 'react';
import { shallow } from 'enzyme';
import { AccountPage } from './Account';
import { PasswordForgetForm } from '../forms/PasswordForget';
import { PasswordChangeForm } from '../forms/PasswordChange';

describe('AccountPage', () => {
    it('renders without crashing', () => {
        shallow(<AccountPage authUser={{}}/>);
    });
    it('renders a password forget form', () => {
        let wrapper = shallow(<AccountPage authUser={{}}/>);

        expect(wrapper.contains(<PasswordForgetForm />)).toEqual(true);
    });
    it('renders a password change form', () => {
        let wrapper = shallow(<AccountPage authUser={{}}/>);

        expect(wrapper.contains(<PasswordChangeForm />)).toEqual(true);
    });
});