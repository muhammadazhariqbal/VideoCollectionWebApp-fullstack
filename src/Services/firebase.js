// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore,collection, addDoc } from "firebase/firestore";
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
const db = getFirestore(app);

// **functions for using firebase product services**
const addRegisteredTenantDetails = async (email,firstName,lastName,companyName,tenantID,userID) => {
  try {
    const docRef = await addDoc(collection(db, "allTenants"), {
     email,
     firstName,
     lastName,
     companyName,
     tenantID,
     userID
    });
    // console.log("Document written with ID: ", docRef.id);
    alert("Thanks for Signing up!")

  } catch (e) {
    console.error("Error adding document: ", e);
    alert(e)
  }
  
}
const registerTenant = (email,password,firstName,lastName,companyName,tenantID) => {
 console.log(`on firebase file ${tenantID}`)
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    addRegisteredTenantDetails(email,firstName,lastName,companyName,tenantID,user.uid);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
}
export {
    registerTenant,
   
};

