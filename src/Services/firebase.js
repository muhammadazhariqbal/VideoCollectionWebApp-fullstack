// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider ,signInWithPopup,onAuthStateChanged, signOut  } from "firebase/auth";
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
const provider = new GoogleAuthProvider();

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
const signInTenant = (email,password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
}

const authenticateTenantUsingGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(token)
    console.log(user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage)
    // ...
  });
}
const authUserStateObserver = () => {
 onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(`user is here ! ==> id :${uid}`)
    // ...
  } else {
    // User is signed out
    // ...
    console.log('user is not here')
  }
});
} 
const signOutTenant = () => {
  signOut(auth)
  .then(res=>{console.log("sign out success!")})
  .catch(error=>{console.log(error.message)})
}
export {
    registerTenant,
    signInTenant,
    authenticateTenantUsingGoogle,
    authUserStateObserver,
    signOutTenant
   
};

