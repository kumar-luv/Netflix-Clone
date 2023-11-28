// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBunpsVXDzWnh6R19cRvv3V1wU7gL8Xh2U",
  authDomain: "netflixgpt-91154.firebaseapp.com",
  projectId: "netflixgpt-91154",
  storageBucket: "netflixgpt-91154.appspot.com",
  messagingSenderId: "53327529955",
  appId: "1:53327529955:web:4df560584e062fe3b5c2d6",
  measurementId: "G-BXR5R132NC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();