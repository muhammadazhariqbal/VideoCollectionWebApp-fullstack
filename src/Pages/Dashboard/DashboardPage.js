import React from 'react';
import { VideoDetailsTable } from '../../Components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { signOutTenant } from '../../Services/firebase';
import { useNavigate } from "react-router-dom";
const DashboardPage = () => {
  let navigate = useNavigate();
    return (
  <Box>
  <Typography variant='h3' align="left" color="#1976d2" fontWeight="bold">Dashboard </Typography>
  <Typography variant='h6' align="left" color="#1976d2" fontWeight="bold">Your Video Listing page URL is </Typography>
  <Button variant="contained" size="large" onClick={() => { 
    signOutTenant();
    navigate('/')
    
    }}>Logout</Button>

 <VideoDetailsTable/>
  </Box>

   
   );
}
export default DashboardPage;