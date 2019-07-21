import {auth, initialState as initialAuthState} from "./auth";
import {authActionCreators} from "../actions";

describe('auth reducer', ()=>{
  test('initializes initial state', ()=>{
    expect(auth(undefined,{})).toEqual(initialAuthState);
  });

  test('login action changes loggedIn to true only', () => {
    const initialState = {...initialAuthState, loggedIn: false};
    const newState = auth(initialState, authActionCreators.login());
    expect(newState.loggedIn).toEqual(!initialState.loggedIn);
    delete newState.loggedIn;
    Object.keys(newState).forEach(key=>expect(newState[key]).toEqual(initialState[key]));
    expect(Object.keys(newState).length + 1).toEqual(Object.keys(initialState).length);
  });

  test('login action does nto change loggedIn state if loggedIn=true', () => {
    const initialState = {...initialAuthState, loggedIn: true};
    const newState = auth(initialState, authActionCreators.login());
    expect(newState.loggedIn).toEqual(true);
  });

  test('auth loading action only changes loading state', () => {
    const initialState = {...initialAuthState, loading: false};
    const newState = auth(initialState, authActionCreators.startLoading());
    expect(newState.loading).toEqual(!initialState.loading);
    delete newState.loading;
    Object.keys(newState).forEach(key=>expect(newState[key]).toEqual(initialState[key]));
    expect(Object.keys(newState).length + 1).toEqual(Object.keys(initialState).length);
  });

  test('login action does nto change loggedIn state if loggedIn=true', () => {
    const initialState = {...initialAuthState, loading: true};
    const newState = auth(initialState, authActionCreators.startLoading());
    expect(newState.loading).toEqual(true);
  });

});
