// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNdqjLP482STqSaPhVEMLjMt8zxVEOfh0",
  authDomain: "gamedock-bebd7.firebaseapp.com",
  databaseURL: "https://gamedock-bebd7-default-rtdb.firebaseio.com",
  projectId: "gamedock-bebd7",
  storageBucket: "gamedock-bebd7.appspot.com",
  messagingSenderId: "201460489117",
  appId: "1:201460489117:web:eb88aecb659dec3f0ead74",
  measurementId: "G-BXE5W8EMCQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

const checkUser = async function (code, username, id) {
  const querySnapshot = getDoc(doc(db, "games", code));

  // Check if the username and/or ID already exist in the users array
  let updated = false;
  // Reject if the username matches but the ID does not match
  if (
    querySnapshot.users.some((userObj) => userObj === username) &&
    querySnapshot.id != username
  ) {
    setMessage("This username is already taken. Please choose another one.");
    updated = true;
  } else {
    updateDoc(doc(db, "games", code), {
      users: { ...{ [`${id}`]: username } },
    });
  }
};

export { app, db };
