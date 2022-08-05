// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { getFirestore, collection, addDoc, getDocs ,doc, onSnapshot} from "firebase/firestore";


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
const storage = getStorage();
// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'video/mp4'
};

// **functions for using firebase product services**
const addRegisteredTenantDetails = async (email, firstName, lastName, companyName, tenantID, userID) => {
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
const registerTenant = (email, password, firstName, lastName, companyName, tenantID) => {
  return new Promise((resolve,reject)=>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      addRegisteredTenantDetails(email, firstName, lastName, companyName, tenantID, user.uid);
      resolve(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
     reject(errorMessage);
    });
  })
  
}
const signInTenant = (email, password) => {
  return new Promise((resolve,reject)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
    const user = userCredential.user;
     resolve(user)
    
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      reject(errorMessage)
    });

  })
 
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

const signOutTenant = () => {
  signOut(auth)
    .then(res => { console.log("sign out success!") })
    .catch(error => { console.log(error.message) })
}
const addUploadVideoDetails = async (name, email, videoURL, tenantID) => {
  try {
    const docRef = await addDoc(collection(db, "allVideosWithDetails"), {
      name,
      email,
      videoURL,
      tenantID,
      videoStatus:'Pending'

    });
    // console.log("Document written with ID: ", docRef.id);
    alert("Thanks for Uploading Video!")

  } catch (e) {
    console.error("Error adding document: ", e);
    alert(e)
  }

}
const uploadVideoToFirebase = (file) => {



  return new Promise((resolve, reject) => {

    // Upload file and metadata to the object 'video/xyz.mp4'
    const storageRef = ref(storage, 'videos/' + file[0].name);
    const uploadTask = uploadBytesResumable(storageRef, file[0], metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        switch (snapshot.state) {
          case 'paused':
            return "paused";
            break;
          case 'running':
            return 'Upload is running';
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            reject(error.message)
            break;
          case 'storage/canceled':
            // User canceled the upload
            reject(error.message)
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            reject(error.serverResponse)
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  })

}

const getAllTenantData = () => {
  return new Promise(async(resolve,reject)=>{
    const querySnapshot = await getDocs(collection(db, "allTenants"));
    resolve(querySnapshot)

  })
}
const getAllVideoDetails = () => {
  return new Promise(async(resolve,reject)=>{
    

const querySnapshot = await getDocs(collection(db, "allVideosWithDetails"));
resolve(querySnapshot);
});
  
}


export {
  registerTenant,
  signInTenant,
  authenticateTenantUsingGoogle,
  signOutTenant,
  uploadVideoToFirebase,
  addUploadVideoDetails,
  getAllTenantData,
  getAllVideoDetails,
  auth,
  onAuthStateChanged
};

