import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyD4SX6CQb_5bBUrt7iQkZ6qhkndPwFQjyU",
  authDomain: "whatsapp-clonekb.firebaseapp.com",
  projectId: "whatsapp-clonekb",
  storageBucket: "whatsapp-clonekb.appspot.com",
  messagingSenderId: "544746190507",
  appId: "1:544746190507:web:7266e4b76e11c399a3a9ee",
  measurementId: "G-55PWF2WLYR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;

 