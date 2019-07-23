import firebase from 'firebase';
import MockFirebase from "mock-cloud-firestore";
import {firebaseAuth} from "./firebaseFascade";
import * as firebaseLocations from './firebaseLocations';
import {mockAuthBuilder, usersFixtureData, validUserResponse} from "../testAssets/firebaseMocks";

describe('Prompts user to login with firebase', () => {

  beforeEach(() => {
    firebaseLocations.UsersRef = ()=>new MockFirebase({...usersFixtureData}).firestore().collection('users');
  });

  beforeEach(()=> {
    firebase.auth = mockAuthBuilder();
  });

  afterEach(()=>{
    jest.resetAllMocks();
  });

  test( 'Returns firebase user object on success', async ()=>{
    const githubLoginResponse = await firebaseAuth.loginWithGithub();
    expect(githubLoginResponse).toBe(validUserResponse);
  });

  test( 'Opens signin popup', async ()=>{
    expect(firebase.auth().signInWithPopup).toBeCalledTimes(0);
    await firebaseAuth.loginWithGithub();
    expect(firebase.auth().signInWithPopup).toBeCalledTimes(1);
  });

  test('fetches returns username from userModel if user model has username', async () => {
    const userModel = await firebaseAuth.fetchOwnUserModel();
    expect(userModel.username).toEqual(usersFixtureData.__collection__.users.__doc__.testUserId.username);
  });

  test('fetches returns null username from userModel if user model doesnt have username', async () => {
    // Clear username from mock database for the default test user.
    const fixtureData = JSON.parse(JSON.stringify(usersFixtureData));
    fixtureData.__collection__.users.__doc__.testUserId.username = undefined;
    firebaseLocations.UsersRef = ()=>new MockFirebase(fixtureData).firestore().collection('users');

    const userModel = await firebaseAuth.fetchOwnUserModel();
    expect(userModel.username).toEqual(null);
  });

  test('if user account not stored in database, returns a usermodel with username null', async () => {
    // Clear mock database records of default test user
    const fixtureData = JSON.parse(JSON.stringify(usersFixtureData));
    delete fixtureData.__collection__.users.__doc__.testUserId;
    firebaseLocations.UsersRef = ()=>new MockFirebase(fixtureData).firestore().collection('users');

    const userModel = await firebaseAuth.fetchOwnUserModel();
    expect(userModel.username).toEqual(null);
  });

  test('signout calls firebase sign out', ()=>{
    expect(firebase.auth().signOut).toBeCalledTimes(0);
    firebaseAuth.signOut();
    expect(firebase.auth().signOut).toBeCalledTimes(1);
  });

  test('Query username returns an array of user models with a given username substring', async ()=>{
    const username = usersFixtureData.__collection__.users.__doc__.testUserId.username;

    const users = await firebaseAuth.findUsersWithUsername(username.substr(0,4));
    expect(users[0].username).toEqual(username);
    expect(users[0].id).toEqual('testUserId');
    expect(users.length).toEqual(1);
  });

  test('setUsername writes to users collection with a username field', async ()=>{
    const username = 'tesusername23';
    const uid = firebase.auth().currentUser.uid;

    // Clear user records for testUserId (this is the mock uid given buy firebase.auth().currentUser.uid)
    const fixtureData = JSON.parse(JSON.stringify(usersFixtureData));
    delete fixtureData.__collection__.users.__doc__.testUserId;
    firebaseLocations.UsersRef = ()=>new MockFirebase(fixtureData).firestore().collection('users');

    let snapshot = await firebaseLocations.UsersRef().doc(uid).get();
    expect(snapshot.exists).toEqual(false);
    await firebaseAuth.setUsername(username);
    snapshot = await firebaseLocations.UsersRef().doc(uid).get();
    expect(snapshot.data().username).toEqual(username);
  });

  test('addPost adds posts to firestore', async () => {
    const linkUrl = "linkToDestinationUrl";
    const imgUrl = "imgUrl";
    const uid = firebase.auth().currentUser.uid;

    // Clear database of any sub collections
    const fixtureData = JSON.parse(JSON.stringify(usersFixtureData));
    delete fixtureData.__collection__.users.__doc__.testUserId.__collection__;
    firebaseLocations.UsersRef = ()=>new MockFirebase(fixtureData).firestore().collection('users');

    let postsSnapshot = await firebaseLocations.UsersRef().doc(uid).collection('posts').get();
    expect(postsSnapshot.empty).toEqual(true);
    await firebaseAuth.addPost({imgUrl, linkUrl});
    postsSnapshot = await firebaseLocations.UsersRef().doc(uid).collection('posts').get();
    expect(postsSnapshot.empty).toEqual(false);
    postsSnapshot.forEach(doc=> expect(doc.data()).toEqual({linkUrl, imgUrl}));
  });

  test('fetch posts fetches posts subcollection from user and returns list of post Models with ids', async () => {
    const mockUid = firebase.auth().currentUser.uid;

    const posts = await firebaseAuth.fetchUserPosts(mockUid);
    posts.forEach(post => {
      expect(post.id).toBeDefined();
      expect(Object.keys(post).length).toEqual(3); // There are 2 fields in mock datbase
    })
  });

  test('fetch posts returns empty array if user does not have any posts', async ()=>{
    const fakeUid = 'notRealUid'; // not a user in the database
    const posts = await firebaseAuth.fetchUserPosts(fakeUid);
    expect(posts).toEqual([]);
  });
});
