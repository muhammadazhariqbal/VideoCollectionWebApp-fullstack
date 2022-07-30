import React, {useEffect} from 'react';
import './App.css';
import {RegisterPage, SignInPage, UploadVideoPage} from './Pages/index';
import {authUserStateObserver,signOutTenant} from './Services/firebase'
function App() {
  useEffect(()=>{
    signOutTenant()
  },[])
  return (
    <UploadVideoPage/>
  );
}

export default App;
