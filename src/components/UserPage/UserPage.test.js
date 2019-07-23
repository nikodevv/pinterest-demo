import React from 'react';
import { shallow } from 'enzyme';
import UserPage from './UserPage';

describe('<UserPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<UserPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
