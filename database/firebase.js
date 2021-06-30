import firebase from 'firebase'

import 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCHcb55u9rMsiq_h1QtzF7O_tUhdwrBysg",
    authDomain: "react-native-firebase-484ce.firebaseapp.com",
    projectId: "react-native-firebase-484ce",
    storageBucket: "react-native-firebase-484ce.appspot.com",
    messagingSenderId: "931555641923",
    appId: "1:931555641923:web:55ae41c0d57973429322f6",
    measurementId: "G-FR6567M0WE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export default {
    firebase, db
}