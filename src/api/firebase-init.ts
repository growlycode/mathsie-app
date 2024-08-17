import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaosWJ6aBGaTTW1_bzfOT5f2hf69eZQ0g",
  authDomain: "mathsie.firebaseapp.com",
  projectId: "mathsie",
  storageBucket: "mathsie.appspot.com",
  messagingSenderId: "139176748382",
  appId: "1:139176748382:web:e54815d85bbf4c15791bcf",
  measurementId: "G-DJHB745NNE"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

