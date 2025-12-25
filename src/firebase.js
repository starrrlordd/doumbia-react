import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjzXBhBFyOQ08I5xv5lSz46PobQ-9pk-U",
  authDomain: "doumbiaonline-e7775.firebaseapp.com",
  projectId: "doumbiaonline-e7775",
  storageBucket: "doumbiaonline-e7775.firebasestorage.app",
  messagingSenderId: "735584056950",
  appId: "1:735584056950:web:ddf9217974145b30ef5157",
  measurementId: "G-MPJDDWCB2J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
export const auth = getAuth(app);