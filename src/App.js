import React, {useEffect} from 'react';
import './App.css';
import {RegisterPage, SignInPage, UploadVideoPage} from './Pages/index';
import {authUserStateObserver,signOutTenant} from './Services/firebase';
import Navigation from './Config/router';
function App() {
  useEffect(()=>{
    signOutTenant()
  },[])
  return (
    <Navigation authListener={authUserStateObserver}/>
  );
}

export default App;
