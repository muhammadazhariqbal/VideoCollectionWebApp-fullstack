import { Box, Typography } from '@mui/material';
import React from 'react';

const VideoCard = ({data}) => {

    return (


      <div style={{height:"300px", width:"300px"}}>
        <video width="100%" height="100%" controls>
          <source src={data.videoURL} type="video/ogg"></source>
          Your browser does not support the video tag.
        </video>
       <Typography variant="p" color="#1976d2">{`Costumer Name : ${data.name}`}</Typography>
       <br></br>
       <Typography variant="p" color="#1976d2">{`Costumer Email : ${data.email}`}</Typography>
      </div>
  
  
    )
  } 
 

export default VideoCard;