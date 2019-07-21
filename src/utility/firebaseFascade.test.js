import firebase from 'firebase';
import {firebaseAuth} from "./firebaseFascade";
import * as firebaseLocations from './firebaseLocations';
import MockFirebase from "mock-cloud-firestore";

const fixtureData = {
      __collection__: {
    users: {
      __doc__: {
        testUserId: {
          age: 15,
          username: 'testUser1',
          // __collection__: {
          //   friends: {
          //     __doc__: {
          //       user_b: {
          //         reference: '__ref__:users/user_b'
          //       }
          //     }
          //   }
          // }
        },
      }
    }
  }
};

describe('Prompts user to login with firebase', () => {
    let validUserResponse;
    let mockAuth;
    function authWrapper () {
    }

    beforeAll(() => {
        firebaseLocations.UsersRef = new MockFirebase(fixtureData).firestore().collection('users');
    });

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
        authWrapper = jest.fn();
        authWrapper.signInWithPopup = jest.fn();
        mockAuth = function() {
            authWrapper.signInWithPopup.mockReturnValue(authPromise);
            return authWrapper
        };
        authWrapper.currentUser = { uid: 'testUserId' };
        mockAuth.GithubAuthProvider = jest.fn(); // placeholder assignment
        firebase.auth = mockAuth;
    });

    test( 'Returns firebase user object on success', async ()=>{
        const githubLoginResponse = await firebaseAuth.loginWithGithub();
        expect(githubLoginResponse).toBe(validUserResponse);
    });

    test( 'Opens signin popup', async ()=>{
        expect(authWrapper.signInWithPopup).toBeCalledTimes(0);
        await firebaseAuth.loginWithGithub();
        expect(authWrapper.signInWithPopup).toBeCalledTimes(1);
    });

    test('fetches returns username from userModel if user model has username', async () => {
        const userModel = await firebaseAuth.fetchOwnUserModel();
        expect(userModel.username).toEqual(fixtureData.__collection__.users.__doc__.testUserId.username);
    });

    test('fetches returns username from userModel if user model has username', async () => {
        const userModel = await firebaseAuth.fetchOwnUserModel();
        expect(userModel.username).toEqual(fixtureData.__collection__.users.__doc__.testUserId.username);
    })
});
