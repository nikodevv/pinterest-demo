import firebase from 'firebase';
import {firebaseAuth} from "./firebaseFascade";

describe('Prompts user to login with firebase', () => {
    let validUserResponse;
    let mockAuth;
    function mockPopupProvider () {
    }

    beforeEach(()=> {
        // Mocks firebase github login
        validUserResponse = {
        user: {
            uid: "testUid1"
        }
    };
        const authPromise = new Promise((resolve, reject) => {
            resolve(validUserResponse)
        });
        mockPopupProvider = jest.fn();
        mockPopupProvider.signInWithPopup = jest.fn();
        mockAuth = function() {
            mockPopupProvider.signInWithPopup.mockReturnValue(authPromise);
            return mockPopupProvider
        };
        mockAuth.GithubAuthProvider = jest.fn(); // placeholder assignment
        firebase.auth = mockAuth;
    });

    test( 'Returns firebase user object on success', async ()=>{
        const githubLoginResponse = await firebaseAuth.loginWithGithub();
        expect(githubLoginResponse).toBe(validUserResponse);
    });

    test( 'Opens signin popup', async ()=>{
        expect(mockPopupProvider.signInWithPopup).toBeCalledTimes(0);
        await firebaseAuth.loginWithGithub();
        expect(mockPopupProvider.signInWithPopup).toBeCalledTimes(1);
    });
});
