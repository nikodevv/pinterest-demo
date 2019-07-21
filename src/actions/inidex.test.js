import { authActions } from "./index";
import { authActionCreators } from "./index";

describe('Auth actions', () => {
    test('all action creators are functions', () => {
        Object.keys(authActionCreators).forEach(key => {
            expect(authActionCreators[key]).toBeInstanceOf(Function);
        })
    });

    test('login action has LOGIN type', () => {
        const actionType = authActionCreators.login().type;
        expect(actionType).toEqual(authActions.LOGIN);
    });

    test('auth.startLoading creates a LOADING_AUTH type action', () => {
        const actionType = authActionCreators.startLoading().type;
        expect(actionType).toEqual(authActions.LOADING_AUTH);
    });

    test('finish loading creator returns an action with username=null '
      + 'when passed an object with no username field ', () => {
       const userModel = {};
       const action = authActionCreators.finishLogin(userModel);
       expect(action.type).toEqual(authActions.FINISH_LOGIN);
       expect(action.username).toEqual(null);
    });

    test('finish loading creator returns an action with username=UsernameModel.username '
      + 'when passed an object with username field ', () => {
      const userModel = { username: 'myValidUsername' };
      const action = authActionCreators.finishLogin(userModel);
      expect(action.type).toEqual(authActions.FINISH_LOGIN);
      expect(action.username).toEqual(userModel.username);
    })
});
