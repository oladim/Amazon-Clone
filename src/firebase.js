import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "Firebase API Key",
    authDomain: "eemanstores-16cab.firebaseapp.com",
    projectId: "eemanstores-16cab",
    storageBucket: "eemanstores-16cab.appspot.com",
    messagingSenderId: "102226507870",
    appId: "1:102226507870:web:e3d61c4106a0f88c681ccf",
    measurementId: "G-ELH4RY3CY7"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth };