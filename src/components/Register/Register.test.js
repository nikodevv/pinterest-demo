import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from "enzyme-adapter-react-16/build";
import {Provider} from "react-redux";
import Register, {helpers} from './Register';
import {FirestoreData} from "../../utility/firebaseFascade";
import {authActionCreators} from "../../actions";

const mockStore = configureMockStore();
configure({adapter: new Adapter()});
window.alert = jest.fn(); // Has to be hijacked in outermost scope

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
    FirestoreData.findUsersWithUsername = jest.fn(()=>[]);
    FirestoreData.setUsername = jest.fn();
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

  test('alphanumeric filter strips out non alphanumeric chars', () => {
    const testValue = 'Test123*** `&),{}TEST';
    const val = helpers.filterAlphanumerics(testValue);
    expect(val).toEqual('Test123TEST');
  });

  test('Component stores username in state', () => {
    initialStoreData.auth.username = null;
    const testInput1 = 'iceFlag'.split('');

    // Set up mocks
    const setUsername = jest.fn();
    const mockUseState = jest.fn((unusedValue) => {
      return [unusedValue, setUsername]
    });
    jest.spyOn(React, 'useState').mockImplementation(mockUseState);
    helpers.filterAlphanumerics = (x)=>x;

    // Test
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
    expect(FirestoreData.findUsersWithUsername).toBeCalledTimes(0);
    helpers.handleSubmit('username', jest.fn(), event);
    expect(FirestoreData.findUsersWithUsername).toBeCalledTimes(1);
  });

  test('submit form handler returns alert if username exists in database, does not call setUsername', async () => {
    const username = 'myusername'; // A username that is not in database
    FirestoreData.findUsersWithUsername.mockImplementation(()=>([{username}]));

    expect(window.alert).toBeCalledTimes(0);
    await helpers.handleSubmit(username, jest.fn(), event);
    expect(window.alert).toBeCalledTimes(1);
    expect(FirestoreData.setUsername).toBeCalledTimes(0);
  });

  test('submit form handler calls set username in fascade if username is not taken', async ()=>{
    const username = 'myusername';

    expect(window.alert).toBeCalledTimes(0);
    await helpers.handleSubmit(username, jest.fn(), event);
    expect(window.alert).toBeCalledTimes(0);
    expect(FirestoreData.setUsername).toBeCalledTimes(1);
    expect(FirestoreData.setUsername).toBeCalledWith(username);
  });

  test('if form handler setusername promise is resolved, calls dispatch with finish login action', async ()=> {
    const username = 'myusername';
    const mockDispatch = jest.fn();

    expect(FirestoreData.setUsername).toBeCalledTimes(0);
    expect(mockDispatch).toBeCalledTimes(0);
    await helpers.handleSubmit(username, mockDispatch, event);
    expect(FirestoreData.setUsername).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith(authActionCreators.finishLogin({username}));
  });

  test('form handler stop propagation', async () => {
    const username = 'myusername';
    event.preventDefault = jest.fn();

    expect(event.preventDefault).toBeCalledTimes(0);
    await helpers.handleSubmit(username, jest.fn(), event);
    expect(event.preventDefault).toBeCalledTimes(1);
  });

});
