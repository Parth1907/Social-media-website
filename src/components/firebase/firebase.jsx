// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDMoCuNwR-IhM4771OtXd6GT-yKw7zpr08",
	authDomain: "social-media-a70ad.firebaseapp.com",
	projectId: "social-media-a70ad",
	storageBucket: "social-media-a70ad.appspot.com",
	messagingSenderId: "521686496737",
	appId: "1:521686496737:web:64bf7457ac84614a7acea0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db, onAuthStateChanged};