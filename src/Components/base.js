import * as firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";
// import "firebase/analytics";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC41kFgPkCn32-MNYWfW06owFMIC4gEEnU",
  authDomain: "progressapp-cc476.firebaseapp.com",
  databaseURL: "https://progressapp-cc476.firebaseio.com",
  projectId: "progressapp-cc476",
  storageBucket: "progressapp-cc476.appspot.com",
  messagingSenderId: "344215147416",
  appId: "1:344215147416:web:0d1714f719174ac87a51ed",
  measurementId: "G-1T0RF76M1F"
});

// firebase.analytics();


export default app;
  