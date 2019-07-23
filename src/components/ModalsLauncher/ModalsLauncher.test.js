import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16/build";
import configureMockStore from 'redux-mock-store';
import ModalsLauncher from './ModalsLauncher';
import {Provider} from "react-redux";

configure({adapter: new Adapter()});

const mockStore = configureMockStore();

describe('<ModalsLauncher />', () => {
  test('renders', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <ModalsLauncher />
      </Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
