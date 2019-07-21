export const authActions = {
  LOGIN: "LOGIN",
  LOADING_AUTH: "LOADING_AUTH"
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
  }
};
