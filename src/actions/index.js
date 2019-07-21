export const authActions = {
  LOGIN: "LOGIN",
  LOADING_AUTH: "LOADING_AUTH",
  FINISH_LOGIN: "FINISH_LOGIN",
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
  }
};
