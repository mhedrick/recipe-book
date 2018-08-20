import React from 'react';
import { shallow } from 'enzyme';
import { Navigation, NavigationAuth, NavigationNonAuth } from './Navigation';

describe('Navigation', () => {
    it('renders without crashing', () => {
        shallow(<Navigation authUser={true} />);
    });
    it('renders the auth navbar if authUser is truthy', ()=> {
        let nav = shallow(<Navigation authUser={true} />);
        expect(nav.contains(<NavigationAuth />)).toEqual(true);
    });
    it('does not render the non auth navbar if authUser is truthy', ()=> {
        let nav = shallow(<Navigation authUser={true} />);
        expect(nav.contains(<NavigationNonAuth />)).not.toEqual(true);
    });
    it('renders the non auth navbar if authUser is false', ()=> {
        let nav = shallow(<Navigation authUser={false} />);
        expect(nav.contains(<NavigationNonAuth />)).toEqual(true);
    });
    it('does not render the auth navbar if authUser is false', ()=> {
        let nav = shallow(<Navigation authUser={false} />);
        expect(nav.contains(<NavigationAuth />)).not.toEqual(true);
    });
});
describe('NavigationAuth', () => {
    it('renders without crashing', () => {
        shallow(<NavigationAuth />);
    });
});
describe('NavigationNonAuth', () => {
    it('renders without crashing', () => {
        shallow(<NavigationNonAuth />);
    });
});