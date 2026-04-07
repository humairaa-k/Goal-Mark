// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from firebase/auth;
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDCBY6jSCIM_80zc-YOngALk-_PV6MBcA",
  authDomain: "goal-mark-93488.firebaseapp.com",
  projectId: "goal-mark-93488",
  storageBucket: "goal-mark-93488.firebasestorage.app",
  messagingSenderId: "641862900330",
  appId: "1:641862900330:web:5cd03340991083e2bcc813"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
