import React , {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const RegisterPage = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [companyName,setCompanyName] = useState('');
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
      borderColor="black"
      border={2}
      
    >
    <Typography variant='h4' align="center">REGISTER YOUR TANENT</Typography>
      <TextField id="outlined-basic" label="Email" variant="outlined" required  onChange={(e)=>{setEmail(e.target.value)}}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" required onChange={(e)=>{setPassword(e.target.value)}}/>
      <TextField id="outlined-basic" label="First Name" variant="outlined" required onChange={(e)=>{setFirstName(e.target.value)}}/>
      <TextField id="outlined-basic" label="Last Name" variant="outlined" required onChange={(e)=>{setLastName(e.target.value)}} />
      <TextField id="outlined-basic" label="Company Name" variant="outlined" required onChange={(e)=>{setCompanyName(e.target.value)}}/>
      <Button variant="contained" size="large" onClick={()=>{alert("press!")}}>REGISTER</Button>
    </Box>
    );
}
export default RegisterPage; 