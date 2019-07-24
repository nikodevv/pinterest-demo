import React from 'react';
import {configure, shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import * as redux from "react-redux";
import Adapter from "enzyme-adapter-react-16/build";
import CopyLink from './CopyLink';

configure({adapter: new Adapter()});
const mockStore=configureMockStore()
describe('<CopyLink />', () => {
  test('renders', () => {
    const wrapper = shallow(
      <redux.Provider store={mockStore()}><CopyLink /></redux.Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
