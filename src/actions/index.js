export const authActions = {
  LOGIN: "LOGIN",
  LOADING_AUTH: "LOADING_AUTH",
  FINISH_LOGIN: "FINISH_LOGIN",
  SIGN_OUT: "SIGN_OUT",
};

export const modalActions = {
  TOGGLE_NEW_LINK_VIEW: "TOGGLE_NEW_LINK_VIEW",
  TOGGLE_SHORT_LINK_MODAL: "TOGGLE_SHORT_LINK_MODAL"
};

export const authActionCreators = {
  login: () => {
    return {
      type: authActions.LOGIN
    }
  },
  startLoading: () => {
    return {
      type: authActions.LOADING_AUTH
    }
  },
  finishLogin: (userModel) => {
    const action = {
      type: authActions.FINISH_LOGIN,
      username: null
    };
    if (userModel.username === undefined) {
      return action;
    }
    action.username = userModel.username;
    return action;
  },
  signOut: () => {
    return { type: authActions.SIGN_OUT }
  },
};

export const modalActionCreators = {
  toggleNewLinkModal: () => ({
    type: modalActions.TOGGLE_NEW_LINK_VIEW
  }),
  toggleShortLinkModal: (link=null) => ({
    type: modalActions.TOGGLE_SHORT_LINK_MODAL,
    link
  })
};
