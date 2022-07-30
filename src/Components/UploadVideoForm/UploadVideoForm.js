import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { signInTenant, authenticateTenantUsingGoogle } from '../../Services/firebase';


const UploadVideoForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [savedVideoURL, setSavedVideoURL] = useState('');
    const [Msg, setMsg] = useState('');

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
            <TextField type="file" variant="outlined" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => { console.log(e.target.files) }} />
            <TextField label="Name" type="text" variant="outlined" required onChange={(e) => { setName(e.target.value) }} />
            <TextField label="Email" type="email" variant="outlined" required onChange={(e) => { setEmail(e.target.value) }} />
            <InputLabel>Message for your Tenant</InputLabel>
            <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Your Message"
                style={{ width: 250, height: 100 }}
                minRows={3}
                onChange={(e) => { setMsg(e.target.value) }}

            />
            <Button variant="contained" size="large" >Upload</Button>

        </Box>
    );
}
export default UploadVideoForm;