import React, { useEffect, useState } from 'react';
import { VideoCard } from '../../Components';
import Stack from '@mui/material/Stack';
import { Typography, Box } from '@mui/material';
import { getAllTenantData, getAllVideoDetails } from "../../Services/firebase";
const VideoListPage = ({ user }) => {
  const [allVideos, setAllVideos] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const setAuthAndVideosOfCurrentUser = async () => {
    await getAllTenantData()
      .then((response) => {
        response.forEach((x) => {
          if (user.uid === x.data().userID) {
            getAllVideoDetails()
              .then(response => {
                var arr = [];
                response.forEach((doc) => {
                  if (doc.data().tenantID === x.data().tenantID) {
                    if (doc.data().videoStatus === "Approved") {
                      arr.push(...arr, doc.data())
                    } else {
                      setAllVideos(arr)
                      setIsLoading(false)
                    }
                  }
                })
                setAllVideos(arr);
                setIsLoading(false)
              })
          }
        })
      })
  }
  useEffect(() => {
    setAuthAndVideosOfCurrentUser();
  })
  if(isLoading){
    return <Typography variant='h6' align="center" marginTop="10%" color="#1976d2" fontWeight="bold">Video Data is Loading, Please Wait!</Typography>
  }
  return <Box>
    <Typography variant='h4' align="center" color="#1976d2" fontWeight="bold">VIDEO LISTING PAGE</Typography>
    <Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap">
      {allVideos[0] ? allVideos.map((video) => {
        return <VideoCard key={video.docID} data={video} />
      }) : <p>No Video Available!</p>}

    </Stack>
  </Box>


}
export default VideoListPage;