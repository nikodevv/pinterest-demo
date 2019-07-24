import {authActions, modalActions} from "../actions";

export const initialState = {
  showNewLinkModal: false,
  showRegisterModal: false,
  showShortLinkModal: false,
  shortLink: null,
};

export const modals = (state = initialState, action ) => {
  switch(action.type) {
    case modalActions.TOGGLE_NEW_LINK_VIEW:
      return {...initialState, showNewLinkModal: !state.showNewLinkModal };
    case authActions.FINISH_LOGIN:
      if (action.username === null) {
        return {...initialState, showRegisterModal: true};
      }
      return {...state, showRegisterModal: false };
    case modalActions.TOGGLE_SHORT_LINK_MODAL:
      return {...initialState, showShortLinkModal: !state.showShortLinkModal, shortLink: action.link};
    default:
      return {...state }
  }
};
