import React, {useEffect, useState} from 'react';
import './App.css';
import {RegisterPage, SignInPage, UploadVideoPage} from './Pages/index';
import {authUserStateObserver,signOutTenant} from './Services/firebase';
import Navigation from './Config/router';
function App() {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(()=>{
    authUserStateObserver()
    .then(res=>{
      setCurrentUser(res)
    
    })
  },[])



 
    return (
    
      <Navigation user={currentUser}/>
    );
  }
 


export default App;
