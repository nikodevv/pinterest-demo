import firebase from "firebase";
import {UsersRef} from './firebaseLocations';

export class FirebaseAuth {
  static loginWithGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  };

  static signOut = () => {
    return firebase.auth().signOut()
  };
}

export class FirestoreData {
  static addPost = (post) => {
    const uid = firebase.auth().currentUser.uid;
    return UsersRef().doc(uid).collection('posts').add(post);
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
  };

  static setUsername = (username) => {
    const uid = firebase.auth().currentUser.uid;
    return UsersRef().doc(uid).set({username}, {merge: true});
  };
  static fetchUserPosts = async (uid) => {
    const query = await UsersRef().doc(uid).collection('posts').get();
    if (query.empty === true){
      return []
    }
    const posts = [];
    query.forEach(doc=> {
      posts.push({
        id: doc.id,
        ...doc.data()
      })
    });
    return posts
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

  static deletePost = (uid, itemId) => {
    return UsersRef().doc(uid).collection('posts').doc(itemId).delete();
  }
}
