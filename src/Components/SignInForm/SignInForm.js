import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { registerTenant } from '../../Services/firebase';

const SignInForm = () => {
  // states for storing user input details
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
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
      <TextField id="outlined-basic" label="Email" type="email" variant="outlined" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
      <TextField id="outlined-basic" label="Password" type="password" variant="outlined" pass value={password} required onChange={(e) => { setPassword(e.target.value) }} />
      <Button variant="contained" size="large" onClick={() => { alert("x") }}>REGISTER</Button>
    </Box>
  );
}
export default SignInForm; 