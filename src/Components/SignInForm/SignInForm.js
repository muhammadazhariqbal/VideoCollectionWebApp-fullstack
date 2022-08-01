import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signInTenant, authenticateTenantUsingGoogle } from '../../Services/firebase';
import { useNavigate } from "react-router-dom";
const SignInForm = () => {
  // states for storing user input details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = () => {
    signInTenant(email, password)
  }
  let navigate = useNavigate();
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '30ch' },
      }}

      autoComplete="off"
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin={2}
      padding={5}


    >
      <Typography variant='h4' align="center" color="#1976d2" fontWeight="bold">SIGN IN TO YOUR TANENT ACCOUNT</Typography>
      <TextField label="Email" type="email" variant="outlined" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
      <TextField label="Password" type="password" variant="outlined" value={password} required onChange={(e) => { setPassword(e.target.value) }} />
      <Button variant="contained" size="large" onClick={() => { signIn() }}>SIGN IN</Button>
      <Button variant="contained" size="large" onClick={() => { authenticateTenantUsingGoogle() }}>SIGN IN USING GOOGLE</Button>
      <Button variant="contained" size="large" onClick={() => { navigate('/RegisterTenant') }}>CREATE NEW ACCOUNT</Button>

    
    </Box>

  );
}
export default SignInForm; 