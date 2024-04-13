// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, child, get, onValue, remove } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkIESw3G7GUywRHQmV1ybHBV-txZc5kzs",
  authDomain: "reactnativeadv.firebaseapp.com",
  databaseURL: "https://reactnativeadv-default-rtdb.firebaseio.com",
  projectId: "reactnativeadv",
  storageBucket: "reactnativeadv.appspot.com",
  messagingSenderId: "224285463861",
  appId: "1:224285463861:web:72d4eb2dd027741350a87c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const dataManager = {
  register: (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("User ID: " + userCredential.user.uid);
      return userCredential.user.uid;
    }).catch((error) => {
      console.log("Error: " + error);
    });
  },
  signInWithEmailAndPassword:  (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("User ID: " + userCredential.user.uid);
      return userCredential.user.uid;
    }).catch((error) => {
      console.log("Error: " + error);
    });
  },
  getUserId: () => {
    if (auth.currentUser === null) {
      return '';
    }
    return auth.currentUser.uid;
  },
  signOut: () => {
    return auth.signOut();
  },
  addWord: (word, phonetic ) => {
    if (dataManager.getUserId() === '' || dataManager.getUserId() === null) {
      return;
    }
    if (phonetic === undefined) {
      phonetic = '';
    }
    set(ref(db, 'users/' + dataManager.getUserId() + '/words/' + word), {
      word: word,
      phonetic: phonetic,
    });
  },
  getWords: () => {
    return get(child(ref(db), 'users/' + dataManager.getUserId() + '/words/')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return Object.values(snapshot.val());
      } else {
        console.log("No data available");
        return [];
      }
    }).catch((error) => {
      console.error(error);
    });
  },
  listenForWords: (callback) => {
    onValue(ref(db, 'users/' + dataManager.getUserId() + '/words/'), (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        callback(Object.values(snapshot.val()));
      } else {
        console.log("No data available");
        callback([]);
      }
    }, {
      onlyOnce: false
    });
  },
  removeWord: (word) => {
    if (dataManager.getUserId() === '' || dataManager.getUserId() === null) {
      return;
    }
    set(ref(db, 'users/' + dataManager.getUserId() + '/words/' + word), null);
  },
  isWordExist: (word) => {
    if (dataManager.getUserId() === '' || dataManager.getUserId() === null) {
      return;
    }
    return get(child(ref(db), 'users/' + dataManager.getUserId() + '/words/' + word)).then((snapshot) => {
      if (snapshot.exists()) {
        return true;
      } else {
        return false;
      }
    }).catch((error) => {
      console.error(error);
    });
  },
}

export default dataManager;

