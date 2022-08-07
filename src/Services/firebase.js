// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { getFirestore, collection, addDoc, getDocs ,doc, updateDoc} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbk8vxwm4aMps9n8oDBuHyiXSCQbb2z7g",
  authDomain: "testimonials-9138d.firebaseapp.com",
  projectId: "testimonials-9138d",
  storageBucket: "testimonials-9138d.appspot.com",
  messagingSenderId: "642553618341",
  appId: "1:642553618341:web:0f5ecdf1f5ecc17671524c",
  measurementId: "G-QWJ0F6JQM6"
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
    console.log("Document written with ID: ", docRef.id);
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
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(token)
      console.log(user.displayName)
      console.log(user.email)
      console.log(user.uid)
      var fullName = user.displayName.split(" ");
      var firstName = fullName[0];
      var lastName = fullName[1];
      var companyName=false;
      var tenantID=false;
      var x = true;
      getAllTenantData()
      .then((response) => {
        
        response.forEach((doc) => {
          
          if (user.uid === doc.data().userID) {
           x=false;
          } 

          
        })
        console.log(x)
        if(x){
          addRegisteredTenantDetails(user.email, firstName, lastName, companyName, tenantID, user.uid)
          
        } else {
          console.log("store nh krni h")
        }
      })


      // ...
    }).catch((error) => {
      // Handle Errors here.
    
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential)
      console.log(errorMessage)
      console.log(email)
      // ...
    });
}

const signOutTenant = () => {
  signOut(auth)
    .then((res) => { console.log("sign out success!") })
    .catch(error => { console.log(error.message) })
}
const addUploadVideoDetails = async (name, email, videoURL, tenantID) => {
  try {
    const docRef = await addDoc(collection(db, "allVideosWithDetails"), {
      name,
      email,
      videoURL,
      tenantID,
      videoStatus:'Pending',
     

    });
    console.log("Document written with ID: ", docRef.id);
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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        
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

const updateFirebaseVideosDocValue= (docID,value) => {
  console.log(`doc id : ${docID}  value : ${value}`)
  const docRef = doc(db, "allVideosWithDetails", docID);
   updateDoc(docRef, {
    videoStatus: value
  });
  
}
const updateFirebaseTenantsDocValue= (docID,value) => {
  console.log(`doc id : ${docID}  value : ${value}`)
  var ID = value.replace(/\s+/g, '-');
  const docRef = doc(db, "allTenants", docID);
   updateDoc(docRef, {
    companyName: value,
    tenantID:ID
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
  onAuthStateChanged,
  updateFirebaseTenantsDocValue,
  updateFirebaseVideosDocValue
};

