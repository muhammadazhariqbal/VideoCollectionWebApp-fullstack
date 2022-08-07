import React, { useEffect, useState } from 'react';
import { VideoDetailsTable } from '../../Components';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { signOutTenant, getAllTenantData, updateFirebaseTenantsDocValue } from '../../Services/firebase';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal'
const DashboardPage = ({ user }) => {
  const [currentUser, setcurrentUser] = useState('');
  const [companyName, setCompanyName] = useState('');
  let navigate = useNavigate();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display: "flex",
    flexDirection: "column",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    getAndSetTenantCurrentUser();
    
  },[companyName])
  const getAndSetTenantCurrentUser = () => {
    getAllTenantData()
      .then((response) => {
        
        response.forEach((doc) => {
        
          if (user.uid === doc.data().userID) {
            setcurrentUser({ ...doc.data(), docID: doc.id });

          }
        })
      })
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(currentUser)
  return (
    <Box>
      <Typography variant='h3' align="center" color="#1976d2" fontWeight="bold">Dashboard </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {currentUser.tenantID ?
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
            
          </Grid> :
          <Grid item m={4}>
            <Typography variant='p' align="center" color="#1976d2" >You have not added company name yet.  </Typography>
            <div>
              <Button onClick={handleOpen}>Open modal</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={2} fontWeight="bold" color="#1976d2">
                    Your Company Name
                  </Typography>
                  <TextField label="Company Name" variant="outlined" value={companyName} required onChange={(e) => { setCompanyName(e.target.value) }} />
                  <br></br>
                  <Button variant="contained" size="large" onClick={() => {
                    console.log(currentUser)
                    updateFirebaseTenantsDocValue(currentUser.docID, companyName);
                    getAndSetTenantCurrentUser()
                  }}>DONE</Button>
                </Box>
              </Modal>
            </div>
          </Grid>}
          <Button variant="text" size="small" onClick={() => {
                signOutTenant();
                navigate("/");
              }}>Logout</Button>
      </Box>
      <VideoDetailsTable user={user} />
    </Box>
  );
}
export default DashboardPage;