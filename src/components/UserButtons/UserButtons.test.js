import React from 'react';
import { shallow } from 'enzyme';
import UserButtons from './UserButtons';

describe('<UserButtons />', () => {
  test('renders', () => {
    const wrapper = shallow(<UserButtons />);
    expect(wrapper).toMatchSnapshot();
  });
});
