import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDc0c-5s4Oz-BYSWbQzw4W9PRIn7EUYPmo",
  authDomain: "gravx-39bbc.firebaseapp.com",
  projectId: "gravx-39bbc",
  storageBucket: "gravx-39bbc.firebasestorage.app",
  messagingSenderId: "536478047608",
  appId: "1:536478047608:web:d42574db08563200fd7c8d",
  measurementId: "G-1PZ67FS3T8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }