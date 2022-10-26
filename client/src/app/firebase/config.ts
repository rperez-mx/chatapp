// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_Firebase_apiKey,
  authDomain: import.meta.env.VITE_Firebase_authDomain,
  projectId: import.meta.env.VITE_Firebase_projectId,
  storageBucket: import.meta.env.VITE_Firebase_storageBucket,
  messagingSenderId: import.meta.env.VITE_Firebase_messagingSenderId,
  appId: import.meta.env.VITE_Firebase_appId,
  measurementId: import.meta.env.VITE_Firebase_measurementId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);