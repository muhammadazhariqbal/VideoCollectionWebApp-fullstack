// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx6H2bsBp6oJMmowD9TNieb-rApkvudj8",
  authDomain: "videocollectionwebapp.firebaseapp.com",
  projectId: "videocollectionwebapp",
  storageBucket: "videocollectionwebapp.appspot.com",
  messagingSenderId: "304751645922",
  appId: "1:304751645922:web:746daabc0c75c5908bfabb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// costum functions for firebase calling firebase services
const registerTenant = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(`user success==>${user}`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`error while registering ==> ${errorMessage}`)
      // ..
    });
}
export {
    registerTenant
}

