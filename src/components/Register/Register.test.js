import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from "enzyme-adapter-react-16/build";
import {Provider} from "react-redux";
import Register from './Register';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();
describe('<Register />', () => {
  const initialStoreData = {
    auth: {
      loading: false,
      username: 'validUsername'
    }
  };

  test('renders', () => {
    const wrapper = shallow(
      <Provider store={mockStore(initialStoreData)}>
        <Register/>
      </Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders null if username is null', () => {
    initialStoreData.auth.username = null;
    const wrapper = mount(
      <Provider store={mockStore(initialStoreData)}>
        <Register/>
      </Provider>);
    expect(wrapper.find('div').isEmpty()).toEqual(true);
  });
});
