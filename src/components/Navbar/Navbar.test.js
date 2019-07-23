import React from 'react';
import configureMockStore from 'redux-mock-store';
import Adapter from "enzyme-adapter-react-16/build";
import {configure, mount, shallow} from 'enzyme';
import Navbar, {helpers} from './Navbar';
import {Provider} from "react-redux";
import {firebaseAuth} from "../../utility/firebaseFascade";
import {authActionCreators, authActions, modalActionCreators} from "../../actions";
import {mockAuthBuilder} from "../../testAssets/firebaseMocks";
import * as firebase from "firebase";
configure({adapter: new Adapter()});

const mockStore = configureMockStore();

describe('<Navbar />', () => {
  const initialStoreData = {
    auth: {
      loading: false,
      loggedIn: false,
      username: 'validUsername',
    }
  };

  beforeEach(()=>{
    firebaseAuth.loginWithGithub = () => new Promise(resolve=>resolve()); // disables outbound call
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders', () => {
    const wrapper = shallow(
        <Provider store={mockStore()}>
          <Navbar />
        </Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  test('Github button clicked calls login function', () => {
    const mockFn = jest.fn();
    // need to use spyOn because login is readonly (can't be overwritten with RHS assignment).
    let loginSpy = jest.spyOn(helpers, 'login').mockImplementation(mockFn);
    const wrapper = mount(
      <Provider store={mockStore(initialStoreData)}>
        <Navbar/>
      </Provider>);
    const GitHubButton = wrapper.find('#githubButton').last();
    GitHubButton.simulate('click');
    expect(mockFn).toBeCalledTimes(1);
  });

  test('Github login button is not rendered if user is logged in', () => {
    initialStoreData.auth.loggedIn = true;
    const wrapper = mount(
      <Provider store={mockStore(initialStoreData)}>
        <Navbar/>
      </Provider>);
    const githubBtnExists = wrapper.exists('#githubButton');
    expect(githubBtnExists).toEqual(false);
  });

  test('a logged in user sees the signout button', () => {
    initialStoreData.auth.loggedIn = true;
    initialStoreData.auth.username = 'validUsername';
    const wrapper = mount(
      <Provider store={mockStore(initialStoreData)}>
        <Navbar/>
      </Provider>);
    const signOutBtn= wrapper.exists('#signOut');
    expect(signOutBtn).toEqual(true);
  });

  test('Clicking signout button signs user out', () => {
    initialStoreData.auth.loggedIn = true;
    initialStoreData.auth.username = 'validUsername';
    const mockFn = jest.fn();
    // need to use spyOn because signout is readonly (can't be overwritten with RHS assignment).
    jest.spyOn(helpers, 'signOut').mockImplementation(mockFn);
    const wrapper = mount(
      <Provider store={mockStore(initialStoreData)}>
        <Navbar/>
      </Provider>);
    const signOutBtn = wrapper.find('#signOut').last();
    expect(mockFn).toBeCalledTimes(0);
    signOutBtn.simulate('click');
    expect(mockFn).toBeCalledTimes(1);
  });
});

describe('Navbar helpers', ()=>{
  let dispatcherPlaceholder = () => null;

  beforeEach(()=>{
    firebaseAuth.loginWithGithub = () => new Promise(resolve=>resolve()); // disables outbound call
    firebase.auth = mockAuthBuilder();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('login function calls firebase wrapper for sign in withpopup', ()=>{
    firebaseAuth.loginWithGithub = jest.fn();
    firebaseAuth.loginWithGithub.mockReturnValue(new Promise(resolve => resolve()));
    expect(firebaseAuth.loginWithGithub).toBeCalledTimes(0);
    helpers.login(dispatcherPlaceholder);
    expect(firebaseAuth.loginWithGithub).toBeCalledTimes(1);
  });

  test('login function calls dispatch 3 times', async ()=>{
    const mock = jest.fn();
    expect(mock).toBeCalledTimes(0);
    await helpers.login(mock);
    expect(mock).toBeCalledTimes(3);
  });

  test('login function calls dispatch with correct action', async ()=>{
    dispatcherPlaceholder = jest.fn();
    await helpers.login(dispatcherPlaceholder);
    expect(dispatcherPlaceholder).toBeCalledWith(authActionCreators.login());
  });

  test('login function dispatches a start loading action', async () => {
    dispatcherPlaceholder = jest.fn();
    await helpers.login(dispatcherPlaceholder);
    expect(dispatcherPlaceholder).toBeCalledWith(authActionCreators.startLoading());
  });

  test('login function fetches user data', async () => {
    firebaseAuth.fetchOwnUserModel = jest.fn(()=>new Promise(resolve=>resolve({username: 'myusername'})));
    expect(firebaseAuth.fetchOwnUserModel).toBeCalledTimes(0);
    await helpers.login(dispatcherPlaceholder);
    expect(firebaseAuth.fetchOwnUserModel).toBeCalledTimes(1);
  });

  test('dispatches an update username action', async () => {
    const model = {username: 'myusername'}
    firebaseAuth.fetchOwnUserModel = jest.fn(()=>new Promise(resolve=>resolve({username: model})));
    await helpers.login(dispatcherPlaceholder);
    expect(dispatcherPlaceholder).toBeCalledWith(authActionCreators.finishLogin(model));
  });

  test('if user has no username, dispatches a show register modal', async () => {
    firebaseAuth.fetchOwnUserModel = jest.fn(()=>new Promise(resolve=>resolve({username: undefined})));
    await helpers.login(dispatcherPlaceholder);
    expect(dispatcherPlaceholder).toBeCalledWith(modalActionCreators.toggleRegisterModal());
  });

  test('signout calls signout bind of firebaseFascade', async () => {
    firebaseAuth.signOut = jest.fn();
    expect(firebaseAuth.signOut).toBeCalledTimes(0);
    await helpers.signOut(dispatcherPlaceholder);
    expect(firebaseAuth.signOut).toBeCalledTimes(1);
  });

  test('signout dispatches signout action', async () => {
    firebaseAuth.signOut = jest.fn();
    dispatcherPlaceholder = jest.fn();
    expect(dispatcherPlaceholder).toBeCalledTimes(0);
    await helpers.signOut(dispatcherPlaceholder);
    expect(dispatcherPlaceholder).toBeCalledTimes(1);
    expect(dispatcherPlaceholder).toBeCalledWith({type: authActions.SIGN_OUT});
  });
});
