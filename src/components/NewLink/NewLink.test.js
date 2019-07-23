import React from 'react';
import { shallow } from 'enzyme';
import NewLink from './NewLink';

describe('<NewLink />', () => {
  test('renders', () => {
    const wrapper = shallow(<NewLink />);
    expect(wrapper).toMatchSnapshot();
  });
});
