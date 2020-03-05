import * as app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyC41kFgPkCn32-MNYWfW06owFMIC4gEEnU",
  authDomain: "progressapp-cc476.firebaseapp.com",
  databaseURL: "https://progressapp-cc476.firebaseio.com",
  projectId: "progressapp-cc476",
  storageBucket: "progressapp-cc476.appspot.com",
  messagingSenderId: "344215147416",
  appId: "1:344215147416:web:0d1714f719174ac87a51ed",
  measurementId: "G-1T0RF76M1F"
};


class FireBase {
  constructor() {
    this.app = app.initializeApp(config);
    this.dataBase = app.firestore();
  }

  getDatabase() {
    return this.dataBase;
  }

  getApp() {
    return this.app;
  }

  signUp(email, password) {
    return this.getApp().auth().createUserWithEmailAndPassword(email, password);
  }

  login(email, password) {
    return  this.app.auth().signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.getApp().auth().signOut();
  }

  getCurrentUser() {
    return this.app.auth().currentUser;
  }
}

export default new FireBase()

  