import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCZNjIrA1v4ZKzq-zYkvxMpFi_UOX1LmQ0",
  authDomain: "fitness-deliverer-c88c7.firebaseapp.com",
  projectId: "fitness-deliverer-c88c7",
  storageBucket: "fitness-deliverer-c88c7.appspot.com",
  messagingSenderId: "212352863036",
  appId: "1:212352863036:web:f95b802dff224d97e32c39",
  measurementId: "G-LGERYXGKG3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
