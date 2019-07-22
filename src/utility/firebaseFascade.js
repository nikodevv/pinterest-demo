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
  }

}
