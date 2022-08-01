import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { registerTenant, authenticateTenantUsingGoogle } from '../../Services/firebase';
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  let navigate = useNavigate();
  // states for storing user input details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const resetUserInputFields = () => {
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setCompanyName('')
  }
  // get and call firebase register method
  const getAndRegisterTenant = () => {
    var ID = companyName.replace(/\s+/g, '-');
    registerTenant(email, password, firstName, lastName, companyName, ID);
    resetUserInputFields();

  }
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
      <Typography variant='h4' align="center" color="#1976d2" fontWeight="bold">REGISTER YOUR TANENT</Typography>
      <TextField label="Email" type="email" variant="outlined" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
      <TextField label="Password" type="password" variant="outlined" value={password} required onChange={(e) => { setPassword(e.target.value) }} />
      <TextField label="First Name" variant="outlined" value={firstName} required onChange={(e) => { setFirstName(e.target.value) }} />
      <TextField label="Last Name" variant="outlined" value={lastName} required onChange={(e) => { setLastName(e.target.value) }} />
      <TextField label="Company Name" variant="outlined" value={companyName} required onChange={(e) => { setCompanyName(e.target.value) }} />
      <Button variant="contained" size="large" onClick={() => { getAndRegisterTenant() }}>REGISTER</Button>
      <Button variant="contained" size="large" onClick={() => { authenticateTenantUsingGoogle() }}>REGISTER USING GOOGLE</Button>
      <Button variant="text" size="large" onClick={() => { navigate('/') }}>Sign In</Button>
    </Box>
  );
}
export default RegisterForm; 