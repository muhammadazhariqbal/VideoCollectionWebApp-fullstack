import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { uploadVideoToFirebase } from '../../Services/firebase';


const UploadVideoForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [savedVideoURL, setSavedVideoURL] = useState('');
    const [Msg, setMsg] = useState('');
    const [isShowBTN, setIsShowBTN] = useState(true);
    const [videoFile, setVideoFile] = useState([]);
    const [uploadedVideoURL, setUploadedVideoURL] = useState([]);

    // function for uploading video file to firebase storage and store details to firebase db
    const uploadVideoAndDetails = () => {
        setIsShowBTN(false);
        // func for uploading file to firebase storage and get uploaded video URL
        uploadVideoToFirebase(videoFile.target.files)
        .then((response)=>{
            setUploadedVideoURL(response);
            setIsShowBTN(true);
        })
        .catch(error=>{
            alert(error);
        })


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
            <TextField type="file" variant="outlined" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => {

                setVideoFile(e);



            }} />
            
            <TextField label="Name" type="text" variant="outlined" required onChange={(e) => { setName(e.target.value) }} />
            <TextField label="Email" type="email" variant="outlined" required onChange={(e) => { setEmail(e.target.value) }} />
            <InputLabel>Message for your Tenant</InputLabel>
            <TextareaAutosize
                aria-label="empty textarea"
                style={{ width: 250, height: 100, padding:5}}
                minRows={3}
                onChange={(e) => { setMsg(e.target.value) }}

            />
            {isShowBTN ? <Button variant="contained" size="large" onClick={() => {
               uploadVideoAndDetails();
                

            }}>Upload</Button> :   <InputLabel>Loading....</InputLabel>}
            

        </Box>
    );
}
export default UploadVideoForm;