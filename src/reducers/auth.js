import {authActions} from '../actions'

export const initialState = {
  loading: false,
  loggedIn: false,
  username: null,
};

export const auth = (state = initialState, action ) => {
  switch (action.type) {
    case authActions.LOGIN:
      return {...state, loggedIn: true};
    case authActions.LOADING_AUTH:
      return {...state, loading: true };
    case authActions.FINISH_LOGIN:
      return {...state, username: action.username, loading: false };
    default:
      return {...state}
  }
};
