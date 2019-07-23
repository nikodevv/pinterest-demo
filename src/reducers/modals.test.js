import { initialState, modals } from "./modals";
import { modalActions } from "../actions";

describe('modals reducer', () => {
  test('newLinkToggle sets showNewLinkToggle to opposite of what it was', () => {
    initialState.showNewLinkModal = false;
    const action = { type: modalActions.TOGGLE_NEW_LINK_VIEW };
    const newState1 = modals(initialState, action);
    const newState2 = modals(newState1, action);

    expect(initialState.showNewLinkModal).toEqual(false);
    expect(newState1.showNewLinkModal).toEqual(true);
    expect(newState2.showNewLinkModal).toEqual(false);
  });

  test('toggleRegister sets showRegisterModal to opposite of what it was', () => {
    initialState.showNewLinkModal = false;
    const action = { type: modalActions.TOGGLE_REGISTER_MODAL };
    const newState1 = modals(initialState, action);
    const newState2 = modals(newState1, action);

    expect(initialState.showRegisterModal).toEqual(false);
    expect(newState1.showRegisterModal).toEqual(true);
    expect(newState2.showRegisterModal).toEqual(false);
  })
});
