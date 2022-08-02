import React, { useState} from 'react';
import './App.css';
import {auth,onAuthStateChanged} from './Services/firebase';
import Navigation from './Config/router';
import { Typography } from '@mui/material';
function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(true)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
      setLoading(false);
      // ...
    } else {
      setCurrentUser(false)
      setLoading(false);
    }
  });
  
  if(loading){
    return <Typography variant="h5" color="#1976d2" align="center" >Loading....</Typography>
  } else {
    return (
    
      <Navigation user={currentUser}/>
    );
  }
    
  }
 


export default App;
