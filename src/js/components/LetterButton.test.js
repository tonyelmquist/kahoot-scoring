import React from 'react';
import enzymeSetup from '../utils/enzymeSetup';
import {shallow} from 'enzyme';
import LetterButton from './LetterButton';


describe('LetterButton tests', () => {
    const item= {
          name: "B",
          value: 30,
          bonusInterval: 2,
          bonusValue: 90,
          tally: 0
        }

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<LetterButton item={item}/>);
    });

    test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
        console.log(wrapper);
    });

});