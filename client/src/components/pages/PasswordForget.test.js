import React from 'react';
import { shallow } from 'enzyme';
import PasswordForgetPage, { PasswordForgetLink } from './PasswordForget';
import {PasswordForgetForm} from '../forms/PasswordForget';

describe('PasswordForget Page', () => {
    it('renders without crashing', () => {
        shallow(<PasswordForgetPage/>);
    });
    it('(link) renders without crashing', () => {
        shallow(<PasswordForgetLink/>);
    });
    it('renders password form', () => {
        let wrapper = shallow(<PasswordForgetPage/>);

        expect(wrapper.contains(<PasswordForgetForm />)).toEqual(true);
    });
});