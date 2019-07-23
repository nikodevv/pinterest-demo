import React from 'react';
import { shallow } from 'enzyme';
import ModalsLauncher from './ModalsLauncher';

describe('<ModalsLauncher />', () => {
  test('renders', () => {
    const wrapper = shallow(<ModalsLauncher />);
    expect(wrapper).toMatchSnapshot();
  });
});
