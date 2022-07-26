import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { registerTenant } from '../../Services/firebase';

const RegisterForm = () => {
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
      <TextField id="outlined-basic" label="Email" variant="outlined" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
      <TextField id="outlined-basic" label="Password" variant="outlined" value={password} required onChange={(e) => { setPassword(e.target.value) }} />
      <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} required onChange={(e) => { setFirstName(e.target.value) }} />
      <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} required onChange={(e) => { setLastName(e.target.value) }} />
      <TextField id="outlined-basic" label="Company Name" variant="outlined" value={companyName} required onChange={(e) => { setCompanyName(e.target.value) }} />
      <Button variant="contained" size="large" onClick={() => { getAndRegisterTenant() }}>REGISTER</Button>
    </Box>
  );
}
export default RegisterForm; 