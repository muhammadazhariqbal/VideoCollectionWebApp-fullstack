import React, { useEffect } from 'react';
import { VideoDetailsTable } from '../../Components';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { signOutTenant, getAllTenantData, getAllVideoDetails } from '../../Services/firebase';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
const DashboardPage = ({ user }) => {
  let navigate = useNavigate();
  useEffect(() => {
    getAllTenantData()
      .then(res => {
        // console.log(`all tenants user id ==> ${res.userID}`)
        console.log(`current user id ${user.uid}`)

      })
    getAllVideoDetails()
      .then(res => {
        // console.log("all videos")
        // console.log(res)
      })
  }, [])

  return (
    <Box>
      
      <Typography variant='h3' align="center" color="#1976d2" fontWeight="bold">Dashboard </Typography>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container >
        <Grid item m={4}>
        <Typography variant='p' align="center" color="#1976d2" >Your Video Listing page URL :  </Typography>
        <Link href="#" underline="none" color="black">
        {`yourdomain.com/upload-video/${'test-user'}`}
      </Link>
        </Grid>
        <Grid item m={4}>
        <Typography variant="p" align="center" color="#1976d2">Your Upload Video URL : </Typography>
        <Link href="#" underline="none" color="black">
        {`yourdomain.com/upload-video/${'test-user'}`}
      </Link>
        </Grid>
        <Grid item m={4}>
        
      <Button variant="text" size="small" onClick={() => {
        signOutTenant();
        navigate("/");
      
      }}>Logout</Button>
        </Grid>
        
      </Grid>
    </Box>
    
    
     

      <VideoDetailsTable />
    </Box>


  );
}
export default DashboardPage;