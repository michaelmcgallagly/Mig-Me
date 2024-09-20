// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "migme-be891.firebaseapp.com",
  projectId: "migme-be891",
  storageBucket: "migme-be891.appspot.com",
  messagingSenderId: "231259076957",
  appId: "1:231259076957:web:d61c2cae41ea792056d0b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//exported firebase services to use in app
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();