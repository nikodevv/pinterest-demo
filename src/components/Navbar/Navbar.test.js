import React from 'react';
import configureMockStore from 'redux-mock-store';
import Adapter from "enzyme-adapter-react-16/build";
import {configure, mount, shallow} from 'enzyme';
import Navbar from './Navbar';
import * as helpers from './helpers';
import {Provider} from "react-redux";
import {firebaseAuth} from "../../utility/firebaseFascade";
import {authActionCreators} from "../../actions";
configure({adapter: new Adapter()});
const mockStore = configureMockStore();

describe('<Navbar />', () => {
  const initialStoreData = {
    auth: {
      loading: false,
      loggedIn: false,
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
});

describe('Navbar helpers', ()=>{
  let dispatcherPlaceholder = () => null;

  beforeEach(()=>{
    firebaseAuth.loginWithGithub = () => new Promise(resolve=>resolve()); // disables outbound call
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

  test('login function calls dispatch', async ()=>{
    const mock = jest.fn(()=>console.log("THIS SHIT IS CALLED"));
    expect(mock).toBeCalledTimes(0);
    await helpers.login(mock);
    expect(mock).toBeCalledTimes(1);
  });

  test('login function calls dispatch with correct action', async ()=>{
    dispatcherPlaceholder = jest.fn();
    await helpers.login(dispatcherPlaceholder);
    expect(dispatcherPlaceholder).toBeCalledWith(authActionCreators.login());
  });
});
