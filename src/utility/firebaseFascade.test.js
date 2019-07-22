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
        const fixtureData = JSON.parse(JSON.stringify(usersFixtureData));
        fixtureData.__collection__.users.__doc__.testUserId.username = undefined;
        firebaseLocations.UsersRef = ()=>new MockFirebase(fixtureData).firestore().collection('users');
        const userModel = await firebaseAuth.fetchOwnUserModel();
        expect(userModel.username).toEqual(null);
    });

    test('if user account not stored in database, returns a usermodel with username null', async () => {
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
});
