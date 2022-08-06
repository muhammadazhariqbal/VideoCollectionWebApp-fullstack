import { Box, Typography, CardMedia, Card, CardContent } from '@mui/material';
import React from 'react';

const VideoCard = ({data}) => {

  const obj = {
    height:200,
    width:200,
    backgroundColor:"black"
  }
    return (
      <Card sx={{backgroundColor:"#1976d2",height:"auto",  maxWidth: 345 , paddingBottom:"10px"}}>
<CardMedia component="iframe"  sx={{height:"70%", width:"100%"}} src={data.videoURL} allow="autoPlay"/>
<CardContent>
        <Typography gutterBottom variant="p" component="div" color="#fff">
        {data.name}
        </Typography>
        <Typography gutterBottom variant="p" component="div" color="#fff">
        {data.email}
        </Typography>
      </CardContent>
      </Card>

      // <div style={{height:"310px", width:"300px", backgroundColor:"#1976d2", padding:"5px"}}>
      //   <video width="100%" height="80%" controls>
      //     <source src={data.videoURL} type="video/ogg"></source>
      //     Your browser does not support the video tag.
      //   </video>
      //  <Typography variant="p"  color="#fff">{`Costumer Name : ${data.name}`}</Typography>
      //  <br></br>
      //  <Typography variant="p"  color="#fff">{`Costumer Email : ${data.email}`}</Typography>
      // </div>
  
  
    )
  } 
 

export default VideoCard;