import {authActions} from '../actions'

const initialState = {
  loading: true,
  loggedIn: false
};

export const auth = (state = initialState, action ) => {
  switch (action.type) {
    case authActions.LOGIN:
      return {...state, loggedIn: true, loading: false};
    default:
      return {...state}
  }
};
