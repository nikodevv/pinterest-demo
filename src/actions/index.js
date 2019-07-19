import {Action} from "redux";

export const authActions = {
  LOGIN: "LOGIN"
};

export const authActionCreators = {
  login: () => {
    return {
      type: authActions.LOGIN
    }
  }
};
