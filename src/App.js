import React, {useEffect} from 'react';
import './App.css';
import {RegisterPage, SignInPage} from './Pages/index';
import {authUserStateObserver,signOutTenant} from './Services/firebase'
function App() {
  useEffect(()=>{
    signOutTenant()
  },[])
  return (
    <SignInPage/>
  );
}

export default App;
