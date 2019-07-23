import React from 'react';
import {configure, shallow} from 'enzyme';
import {Provider} from "react-redux";
import Adapter from "enzyme-adapter-react-16/build";
import configureMockStore from 'redux-mock-store';
import NewLink from './NewLink';

configure({adapter: new Adapter()});

const mockStore = configureMockStore();

describe('<NewLink />', () => {
  test('renders', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <NewLink />
      </Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
