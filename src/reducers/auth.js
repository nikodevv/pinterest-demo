import {authActions} from '../actions'

export const initialState = {
  loading: false,
  loggedIn: false
};

export const auth = (state = initialState, action ) => {
  switch (action.type) {
    case authActions.LOGIN:
      return {...state, loggedIn: true};
    case authActions.LOADING_AUTH:
      return {...state, loading: true };
    default:
      return {...state}
  }
};
