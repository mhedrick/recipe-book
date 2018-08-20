import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from './Landing';

describe('LandingPage', () => {
    it('renders without crashing', () => {
        shallow(<LandingPage />);
    });
});