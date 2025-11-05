// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtPxxHh8zNB4E5bSS_vhqL-NPyJ9ULst8",
  authDomain: "zytrone-92da0.firebaseapp.com",
  projectId: "zytrone-92da0",
  storageBucket: "zytrone-92da0.firebasestorage.app",
  messagingSenderId: "706745159076",
  appId: "1:706745159076:web:c1cce281bc34b5d92a8531",
  measurementId: "G-C3VDZJCBK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, analytics }

