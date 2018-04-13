import React from 'react';
import enzymeSetup from '../utils/enzymeSetup';
import {shallow} from 'enzyme';
import Logo from './Logo';


describe('Logo tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Logo />);
    });

    test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});