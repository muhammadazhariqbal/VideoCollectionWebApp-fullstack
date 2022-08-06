import React, { useEffect, useState } from 'react';
import { VideoDetailsTable } from '../../Components';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { signOutTenant, getAllTenantData } from '../../Services/firebase';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const DashboardPage = ({ user }) => {
  const [currentUser, setcurrentUser] = useState('');
  let navigate = useNavigate();
  
 
useEffect(()=>{
  getAllTenantData()
    .then((response)=>{
      response.forEach((doc)=>{
        if(user.uid===doc.data().userID){
          setcurrentUser(doc.data());
         
        }
      })
    })
},[user])


  return (
    <Box>

      <Typography variant='h3' align="center" color="#1976d2" fontWeight="bold">Dashboard </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container >
          <Grid item m={4}>
            <Typography variant='p' align="center" color="#1976d2" >Your Video Upload page URL :  </Typography>
            <Link href={`http://localhost:3000/upload-video/${currentUser.tenantID}`} underline="none" color="black" target="_blank">
              {`http://localhost:3000/upload-video/${currentUser.tenantID}`}
            </Link>
          </Grid>
          <Grid item m={4}>
            <Typography variant="p" align="center" color="#1976d2">Your Video Listing URL : </Typography>
            <Link href={`http://localhost:3000/video-listing/${currentUser.tenantID}`} underline="none" color="black" target="_blank">
              {`http://localhost:3000/video-listing/${currentUser.tenantID}`}
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



            
      <VideoDetailsTable user={user} />
    </Box>


  );
}
export default DashboardPage;