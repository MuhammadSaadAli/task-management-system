// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4nBeUhu3Fy8DlTPekrBhF9JNDl9aCgOY",
  authDomain: "practice-firebase-8264b.firebaseapp.com",
  projectId: "practice-firebase-8264b",
  storageBucket: "practice-firebase-8264b.appspot.com",
  messagingSenderId: "527159377286",
  appId: "1:527159377286:web:eb2360cb8440e6d668c007",
  measurementId: "G-BCHFS0LH83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)