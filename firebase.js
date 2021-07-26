import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBqRZdcOgC5pSc-5nlpPjAsGIJ_qAt0dvU",
  authDomain: "docs-926c8.firebaseapp.com",
  projectId: "docs-926c8",
  storageBucket: "docs-926c8.appspot.com",
  messagingSenderId: "304459143961",
  appId: "1:304459143961:web:646e3042af72e5a962c388",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export { db };
