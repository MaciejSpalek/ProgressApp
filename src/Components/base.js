import * as app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import 'firebase/storage';
import 'firebase/database';

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
    this.realTimeDatabase = app.database();
    this.storage = app.storage();
  }

  getApp() {
    return this.app;
  }
  getDatabase() {
    return this.dataBase;
  }
  getRealTimeDatabase() {
    return this.realTimeDatabase;
  }
  getStorage() {
    return this.storage;
  }


  signUp(email, password) {
    return this.getApp().auth().createUserWithEmailAndPassword(email, password);
  }
  login(email, password) {
    return  this.getApp().auth().signInWithEmailAndPassword(email, password)
  }
  logout() {
    return this.getApp().auth().signOut();
  }
  getCurrentUser() {
    return this.getApp().auth().currentUser;
  }
  getUserID() {
    return this.getCurrentUser().uid;
  }
  getRootRef(refName) {
    return this.getRealTimeDatabase().ref(refName)
  }

  // returns all users except you
  getAllUsers = (setState) => {
    const usersRef = this.getRealTimeDatabase().ref("users");
    const tempArray = [];
    
    usersRef.on('value', snapshot => {
        const users = snapshot.val();
        for(let user in users) {
            if(users[user].userID !== this.getUserID()) {
                tempArray.push(users[user]);
            }
        }
        setState(tempArray);
    })
  }

  // returns all your friends
  getAllFriends = (setState) => {
    const userID = this.getUserID();
    const friendsRef = this.getRealTimeDatabase().ref("friends").child(userID);
    const usersRef = this.getRealTimeDatabase().ref("users");

    friendsRef.on('value', snapshot => {
        const friends = snapshot.val();
        const tempArray = [];

        for(let friend in friends) {
            if(friends[friend].userID !== this.getUserID()) {
              usersRef.child(friends[friend].userID).once('value', snapshot1 => {
                tempArray.push(snapshot1.val());
              })
            }
        }
        setState(tempArray);
    })
  }

  // returns amount of friends
  countFriends(setState) {
    const userID = this.getUserID();
    const friendsRef = this.getRealTimeDatabase().ref("friends").child(userID);

    friendsRef.on('value', snapshot => {
        const friends = snapshot.val();
        let counter = 0;
        for(let friend in friends) {
            if(friends[friend].userID !== this.getUserID()) {
              counter++;
            }
        }
        setState(counter);
    })
  }



  getUserCollection = ()=> {
    return this.getDatabase().collection(`users`).doc(this.getUserID());
  }

 
  sortByDate(array) {
    return array.sort((a,b) =>  new Date(b.date).getTime() - new Date(a.date).getTime());
}
}


  

export default new FireBase()

  