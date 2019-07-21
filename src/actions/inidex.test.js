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
    })
});
