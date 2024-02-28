// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASqLpu5J0-nD-aQCiK-sKMjbkD_hZpuBI",
  authDomain: "stay-fresh-auth.firebaseapp.com",
  projectId: "stay-fresh-auth",
  storageBucket: "stay-fresh-auth.appspot.com",
  messagingSenderId: "661254585218",
  appId: "1:661254585218:web:d3c3711278114a3a7b6d9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
