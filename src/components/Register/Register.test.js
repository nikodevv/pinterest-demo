import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from "enzyme-adapter-react-16/build";
import {Provider} from "react-redux";
import Register, {helpers} from './Register';
import {firebaseAuth} from "../../utility/firebaseFascade";
import {App} from '../../App';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();
window.alert = jest.fn(); // must be defined in outer scope
describe('<Register />', () => {
  let initialStoreData;
  let event = {
    preventDefault: ()=>null
  };
  beforeEach(()=>{
    initialStoreData = {
      auth: {
        loading: false,
        loggedIn: true,
        username: 'validUsername',
      }
    };
    firebaseAuth.findUsersWithUsername = jest.fn(()=>[]);
    firebaseAuth.setUsername = jest.fn();
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  test('submit form handler calls firebase Fascade endpoint to check if username exists', ()=> {
    expect(firebaseAuth.findUsersWithUsername).toBeCalledTimes(0);
    helpers.handleSubmit('username', jest.fn(), event);
    expect(firebaseAuth.findUsersWithUsername).toBeCalledTimes(1);
  });

  test('submit form handler returns alert if username exists in database, does not call setUsername', async () => {
    const username = 'myusername';
    firebaseAuth.findUsersWithUsername.mockImplementation(()=>([{username}]));
    expect(window.alert).toBeCalledTimes(0);
    await helpers.handleSubmit(username, jest.fn(), event);
    expect(window.alert).toBeCalledTimes(1);
    expect(firebaseAuth.setUsername).toBeCalledTimes(0);
  });

  test('submit form handler calls set username in fascade if username is not taken', async ()=>{
    const username = 'myusername';
    expect(window.alert).toBeCalledTimes(0);
    await helpers.handleSubmit(username, jest.fn(), event);
    expect(window.alert).toBeCalledTimes(0);
    expect(firebaseAuth.setUsername).toBeCalledTimes(1);
    expect(firebaseAuth.setUsername).toBeCalledWith(username);
  });

  test('if form handler setusername promise is resolved, calls dispatch', async ()=> {
    const username = 'myusername';
    const mockDispatch = jest.fn();
    expect(firebaseAuth.setUsername).toBeCalledTimes(0);
    expect(mockDispatch).toBeCalledTimes(0);
    await helpers.handleSubmit(username, mockDispatch, event);
    expect(firebaseAuth.setUsername).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('form handler stop propagation', async () => {
    const username = 'myusername';
    event.preventDefault = jest.fn();
    expect(event.preventDefault).toBeCalledTimes(0);
    await helpers.handleSubmit(username, jest.fn(), event);
    expect(event.preventDefault).toBeCalledTimes(1);
  })
});
