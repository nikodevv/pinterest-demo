import firebase from 'firebase';
import MockFirebase from "mock-cloud-firestore";
import {firebaseAuth} from "./firebaseFascade";
import * as firebaseLocations from './firebaseLocations';
import {mockAuthBuilder, usersFixtureData, validUserResponse} from "../testAssets/firebaseMocks";

describe('Prompts user to login with firebase', () => {

    beforeAll(() => {
        firebaseLocations.UsersRef = ()=>new MockFirebase(usersFixtureData).firestore().collection('users');
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
        usersFixtureData.__collection__.users.__doc__.testUserId.username = undefined;
        const userModel = await firebaseAuth.fetchOwnUserModel();
        expect(userModel.username).toEqual(null);
    });

    test('if user account not stored in database, returns a usermodel with username null', async () => {
        delete usersFixtureData.__collection__.users.__doc__.testUserId;
        const userModel = await firebaseAuth.fetchOwnUserModel();
        expect(userModel.username).toEqual(null);
    })
});
