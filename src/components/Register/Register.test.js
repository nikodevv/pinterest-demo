import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from "enzyme-adapter-react-16/build";
import {Provider} from "react-redux";
import Register, {helpers} from './Register';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();
describe('<Register />', () => {
  let initialStoreData;

  beforeEach(()=>{
    initialStoreData = {
      auth: {
        loading: false,
        loggedIn: true,
        username: 'validUsername',
      }
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders', () => {
    const wrapper = shallow(
      <Provider store={mockStore(initialStoreData)}>
        <Register/>
      </Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders null if auth is loading', () => {
    initialStoreData.auth.loading = true;
    const wrapper = mount(
      <Provider store={mockStore(initialStoreData)}>
        <Register/>
      </Provider>);
    expect(wrapper.find('div').isEmpty()).toEqual(true);
  });

  test('renders null if username is not null and loggedIn is true', () => {
    const wrapper = mount(
      <Provider store={mockStore(initialStoreData)}>
        <Register/>
      </Provider>);
    expect(wrapper.find('div').isEmpty()).toEqual(true);
  });

  test('renders registration form if username is null and logged in is true', () => {
    initialStoreData.auth.username = null;
    const wrapper = mount(
      <Provider store={mockStore(initialStoreData)}>
        <Register/>
      </Provider>);
    expect(wrapper.find('form').isEmpty()).toEqual(false);
  });

  test('alphanumeric filter strips out non alphanumeric chars', () => {
    const testValue = 'Test123*** `&),{}TEST';
    const val = helpers.filterAlphanumerics(testValue);
    expect(val).toEqual('Test123TEST');
  });

  test('setUsername is called on input value change', () => {
    initialStoreData.auth.username = null;
    const testInput1 = 'iceFlag'.split('');
    const setUsername = jest.fn();
    const mockUseState = jest.fn((unusedValue) => {
      return [unusedValue, setUsername]
    });
    jest.spyOn(React, 'useState').mockImplementation(mockUseState);
    helpers.filterAlphanumerics = (x)=>x;
    expect(mockUseState).toBeCalledTimes(0);
    const wrapper = mount(
      <Provider store={mockStore(initialStoreData)}>
        <Register/>
      </Provider>);
    expect(mockUseState).toBeCalledTimes(1);
    expect(wrapper.find('#usernameInput').isEmpty()).toEqual(false);
    testInput1.forEach((key) => {
      wrapper.find('#usernameInput').simulate('change', {target:{value: key}});
      expect(setUsername).toBeCalledWith(key);
    })
  });
});
