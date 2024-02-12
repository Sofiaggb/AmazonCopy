// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAImZhK0jzQEIVBqxS_2AWxEH4CRrhEUbM",
  authDomain: "fir-d8a37.firebaseapp.com",
  projectId: "fir-d8a37",
  storageBucket: "fir-d8a37.appspot.com",
  messagingSenderId: "119608091500",
  appId: "1:119608091500:web:30379beea297ca9e660949",
  measurementId: "G-W2XK5BJET6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig