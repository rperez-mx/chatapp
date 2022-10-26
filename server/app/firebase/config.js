// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB64nqBsP8vL4ZOhthjercSpLfboa6vJXM",
  authDomain: "simplechatio.firebaseapp.com",
  projectId: "simplechatio",
  storageBucket: "simplechatio.appspot.com",
  messagingSenderId: "83152484522",
  appId: "1:83152484522:web:df7dcd839503ba9f1a38d3",
  measurementId: "G-ZQ6R4PP6FK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);