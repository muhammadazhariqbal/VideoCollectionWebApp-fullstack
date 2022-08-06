import { Typography, CardMedia, Card, CardContent } from '@mui/material';
import React from 'react';

const VideoCard = ({ data }) => {


  return (
    <Card sx={{ backgroundColor: "#1976d2", height: "auto", maxWidth: 345, paddingBottom: "10px" }}>
      <CardMedia component="iframe" sx={{ height: "70%", width: "100%" }} src={data.videoURL} allow="autoPlay" />
      <CardContent>
        <Typography gutterBottom variant="p" component="div" color="#fff">
          {data.name}
        </Typography>
        <Typography gutterBottom variant="p" component="div" color="#fff">
          {data.email}
        </Typography>
      </CardContent>
    </Card>




  )
}


export default VideoCard;