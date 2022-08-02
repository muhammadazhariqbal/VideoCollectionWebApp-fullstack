import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { uploadVideoToFirebase, addUploadVideoDetails } from '../../Services/firebase';
import {useParams } from 'react-router-dom'

const UploadVideoForm = () => {
    let { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tenantID, setTenantID] = useState(id);
    const [msg, setMsg] = useState('');
    const [isShowBTN, setIsShowBTN] = useState(true);
    const [videoFile, setVideoFile] = useState([]);
  
    
    const resetUserInputFields = () => {
        setName('')
        setEmail('')
        setTenantID('')
        setMsg('')
        
    }
    // function for uploading video file to firebase storage and store details to firebase db
    const uploadVideoAndDetails = async () => {
        setIsShowBTN(false);
        // func for uploading file to firebase storage and get uploaded video URL
        await uploadVideoToFirebase(videoFile.target.files)
            .then((response) => {
                setIsShowBTN(true);
                addUploadVideoDetails(name, email, response, tenantID);

            })
            .catch(error => {
                setIsShowBTN(true);
                alert(error);
            })
        resetUserInputFields()


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
            <Typography variant='h4' align="center" color="#1976d2" fontWeight="bold">UPLOAD VIDEO FOR YOUR TENANT</Typography>
            <InputLabel>Choose Video File</InputLabel>
            <TextField type="file" variant="outlined" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => {setVideoFile(e)}} />
            <TextField label="Name" type="text" variant="outlined" value={name} required onChange={(e) => { setName(e.target.value) }} />
            <TextField label="Email" type="email" variant="outlined" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
            <TextField label="Tanent ID" type="text" variant="outlined" value={tenantID} disabled onChange={(e) => { setTenantID(e.target.value) }} />
            <InputLabel>Message for your Tenant</InputLabel>
            <TextareaAutosize
                aria-label="empty textarea"
                style={{ width: 250, height: 100, padding: 5 }}
                minRows={3}
                value={msg}
                onChange={(e) => { setMsg(e.target.value) }}

            />
            {isShowBTN ? <Button variant="contained" size="large" onClick={() => {uploadVideoAndDetails()}}>Upload</Button> : <InputLabel>Please Wait! Your Video Details is uploading....</InputLabel>}


        </Box>
    );
}
export default UploadVideoForm;