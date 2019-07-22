import firebase from "firebase";
import {UsersRef} from './firebaseLocations';

export class firebaseAuth {
  static loginWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  };

  static fetchOwnUserModel = async () => {
    const uid = firebase.auth().currentUser.uid;
    const snapshot = await UsersRef().doc(uid).get();
    if (snapshot.exists && snapshot.data().username !== undefined) {
      return snapshot.data();
    }
    return {
      username: null
    }
  };

  static signOut = () => {
    return firebase.auth().signOut()
  };

  static findUsersWithUsername = async (queryStr) => {
    const query = await UsersRef().where('username','>=', queryStr);
    const snapshot = await query.get();
    const userModels = [];
    snapshot.forEach(doc => {
      const userObj = {...doc.data(), id: doc.id };
      userModels.push(userObj)
    });
    return userModels;
  }

}
