
export const usersFixtureData = {
    __collection__: {
      users: {
        __doc__: {
          testUserId: {
            age: 15,
            username: 'testUser1',
            __collection__: {
              posts: {
                __doc__: {
                  postWithId1: {
                    linkUrl: 'pathToLinkUrl',
                    imgUrl: 'pathToImgUrl',
                  }
                }
              }
            }
          },
          testUserId2: {
            //no username
          },
          testUserId3: {
            username: 'QduU43E'
          },
        }
      }
    }
};

// valid response from a resolved firebase.auth().signInWithPopup promise.
export const validUserResponse = {
  user: {
    uid: "testUid1"
  }
};


// Creates a mocked object for firebase.auth
const authWrapper = jest.fn();
const signInWithPopup = jest.fn();
const signOut = jest.fn(() => new Promise(resolve => resolve()));
export const mockAuthBuilder = () => {
  const authPromise = new Promise((resolve, reject) => {
    resolve(validUserResponse)
  });
  const mockAuth = () => {
    authWrapper.signInWithPopup = signInWithPopup;
    authWrapper.currentUser = { uid: 'testUserId' };
    authWrapper.signInWithPopup.mockReturnValue(authPromise);
    authWrapper.signOut = signOut;
    return authWrapper
  };
  mockAuth.GithubAuthProvider = jest.fn(); // placeholder assignment
  return mockAuth
};
