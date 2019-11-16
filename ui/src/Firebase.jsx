import firebase from 'firebase/app';
import 'firebase/auth';

// TODO: Add your Firebase config
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};


const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.auth();
