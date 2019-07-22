import {modalActions} from "../actions";

export const initialState = {
  showNewLinkModal: false
};

export const modals = (state = initialState, action ) => {
  switch(action.type) {
    case modalActions.TOGGLE_NEW_LINK_VIEW:
      return {...initialState, showNewLinkModal: !state.showNewLinkModal };
    default:
      return {...state}
  }
};
