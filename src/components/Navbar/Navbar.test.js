import React from 'react';
import configureMockStore from 'redux-mock-store';
import Adapter from "enzyme-adapter-react-16/build";
import {configure, shallow} from 'enzyme';
import Navbar from './Navbar';
import { Provider } from "react-redux";

configure({adapter: new Adapter()});
const mockStore = configureMockStore();

describe('<Navbar />', () => {
  test('renders', () => {
    const wrapper = shallow(
        <Provider store={mockStore()}>
          <Navbar />
        </Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
