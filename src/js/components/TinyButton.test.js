import React from 'react';
import enzymeSetup from '../utils/enzymeSetup';
import {shallow} from 'enzyme';
import TinyButton from './TinyButton';


describe('TinyButton tests', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TinyButton />);
    });

    test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});