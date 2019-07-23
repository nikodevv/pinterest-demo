import { initialState, modals } from "./modals";
import {authActionCreators, modalActions} from "../actions";

describe('modals reducer', () => {
  test('newLinkToggle sets showNewLinkToggle to opposite of what it was', () => {
    const state = { ...initialState, showNewLinkModal: false };
    const action = { type: modalActions.TOGGLE_NEW_LINK_VIEW };
    const newState1 = modals(state, action);
    const newState2 = modals(newState1, action);

    expect(newState1.showNewLinkModal).toEqual(true);
    expect(newState2.showNewLinkModal).toEqual(false);
  });

  test('receiving a finishLogin action without a username field sets state.showRegisterModal to true', () => {
    expect(initialState.showRegisterModal).toEqual(false);
    const action = authActionCreators.finishLogin({});
    const newState = modals(initialState, action);
    expect(newState.showRegisterModal).toEqual(true);
  });

  test('receiving a finishLogin action without a username field sets state.showRegisterModal to false', () => {
    const state = {...initialState, showRegisterModal: true };
    const action = authActionCreators.finishLogin({username: 'ausename'});
    const newState = modals(initialState, action);
    expect(newState.showRegisterModal).toEqual(false);
  })
});
