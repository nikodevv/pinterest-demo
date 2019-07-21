import firebase from "firebase";

export class firebaseAuth {
    static loginWithGithub = () => {
        const provider = firebase.auth.GithubAuthProvider;
        return firebase.auth().signInWithPopup(provider)
    };
}
