// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3OCaIJTJPjFaNnpwF5E0jg_MBvYn2zGE",
  authDomain: "treasure-island-23.firebaseapp.com",
  projectId: "treasure-island-23",
  storageBucket: "treasure-island-23.appspot.com",
  messagingSenderId: "818292403185",
  appId: "1:818292403185:web:8aca89ecbb6e3460ab3250",
  measurementId: "G-D2WSVYKL0H"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;