// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_gWYdxEdQ4MwWrX6mjUp5PT9CFmQey58",
  authDomain: "netflixgpt-26833.firebaseapp.com",
  projectId: "netflixgpt-26833",
  storageBucket: "netflixgpt-26833.appspot.com",
  messagingSenderId: "144527336710",
  appId: "1:144527336710:web:dd9678ca3ce1545ff62a87",
  measurementId: "G-JX4FY0P66E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
