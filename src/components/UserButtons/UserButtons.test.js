import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import * as redux from "react-redux";
import Adapter from "enzyme-adapter-react-16/build";
import configureMockStore from 'redux-mock-store';
import UserButtons from './UserButtons';
import {initialState as initialModalState} from "../../reducers/modals";
import {initialState as initialAuthState} from "../../reducers/auth";
import {modalActionCreators} from "../../actions";

configure({adapter: new Adapter()});
const mockStore = configureMockStore();

describe('<UserButtons />', () => {
  afterEach(()=>{
    jest.clearAllMocks();
  });

  test('renders', () => {
    const wrapper = shallow(<redux.Provider store={mockStore({auth: initialAuthState})}>
      <UserButtons />
    </redux.Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  test('+ button calls dispatch with modal launching action', () => {
    const appState = {
      modals: initialModalState,
      auth: {
        loggedIn: true
      }
    };
    const mockFn = jest.fn();
    // noinspection JSCheckFunctionSignatures // WebStorm gives incorrect warning on this line
    const useDispatchMock = jest.spyOn(redux, 'useDispatch').mockImplementation(jest.fn(()=>mockFn));
    const wrapper = mount(<redux.Provider store={mockStore(appState)}>
      <UserButtons />
    </redux.Provider>);
    const plusButton = wrapper.find("#addLink").first();
    expect(mockFn).toBeCalledTimes(0);
    plusButton.simulate('click');
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(modalActionCreators.toggleNewLinkModal())

  });
});
