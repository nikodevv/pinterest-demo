/*
* Utility functions that are used by Navbar exclusively.
* These files are separated so that they can be mocked in unit tests in a redux environment.
* Interesting article related to folder structure choice:
* https://medium.com/@DavideRama/mock-spy-exported-functions-within-a-single-module-in-jest-cdf2b61af642
* */
import { firebaseAuth } from "../../utility/firebaseFascade";
import {authActionCreators} from "../../actions";

export const login = async (dispatch) => {
  const startLoadingAction = authActionCreators.startLoading();
  dispatch(startLoadingAction);
  await firebaseAuth.loginWithGithub();
  const loginAction = authActionCreators.login();
  dispatch(loginAction);
  const userModel = await firebaseAuth.fetchOwnUserModel();
  const storeUsernameAction = authActionCreators.finishLogin(userModel);
  dispatch(storeUsernameAction);
};

export const signOut = async (dispatch) => {
  await firebaseAuth.signOut();
  dispatch(authActionCreators.signOut());
};
