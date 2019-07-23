import {modalActions} from "../actions";

export const initialState = {
  showNewLinkModal: false,
  showRegisterModal: false,
};

export const modals = (state = initialState, action ) => {
  switch(action.type) {
    case modalActions.TOGGLE_NEW_LINK_VIEW:
      return {...initialState, showNewLinkModal: !state.showNewLinkModal };
    case modalActions.TOGGLE_REGISTER_MODAL:
      return {...initialState, showRegisterModal: !state.showRegisterModal };
    default:
      return {...state }
  }
};
