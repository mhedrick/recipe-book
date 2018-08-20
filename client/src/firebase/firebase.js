import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDLD6VsekwLbtR_y8ck0tleSXrwGbdDKMk",
    authDomain: "mkh-recipebook-prod.firebaseapp.com",
    databaseURL: "https://mkh-recipebook-prod.firebaseio.com",
    projectId: "mkh-recipebook-prod",
    storageBucket: "",
    messagingSenderId: "432483077386"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};