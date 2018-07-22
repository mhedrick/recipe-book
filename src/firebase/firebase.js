import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA_tZMRUajLxbWbm-euSlbIHi4quc1I-dQ",
    authDomain: "mhedrick-recipebook.firebaseapp.com",
    databaseURL: "https://mhedrick-recipebook.firebaseio.com",
    projectId: "mhedrick-recipebook",
    storageBucket: "mhedrick-recipebook.appspot.com",
    messagingSenderId: "919599199844"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};