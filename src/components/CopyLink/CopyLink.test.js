import React from 'react';
import { shallow } from 'enzyme';
import CopyLink from './CopyLink';

describe('<CopyLink />', () => {
  test('renders', () => {
    const wrapper = shallow(<CopyLink />);
    expect(wrapper).toMatchSnapshot();
  });
});
