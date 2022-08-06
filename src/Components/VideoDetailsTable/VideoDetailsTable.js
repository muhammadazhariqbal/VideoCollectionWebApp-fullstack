import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Link, Typography } from '@mui/material';
import { getAllTenantData, getAllVideoDetails,updateFirebaseDocValue } from "../../Services/firebase";
function createData(name, email, videoLink, status, action) {
  return { name, email, videoLink, status, action };
}


const VideoDetailsTable = ({ user }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [allVideos, setAllVideos] = useState([]);
  const [allVideosOfCurrentUser, setAllVideosOfCurrentUser] = useState([]);
  const setAuthAndVideosOfCurrentUser = async () => {
    await getAllTenantData()
      .then((response) => {
        var arr = [];
        response.forEach((x) => {
          if (user.uid === x.data().userID) {
            
            getAllVideoDetails()
              .then(response => {
                response.forEach((doc) => {

                  if (doc.data().tenantID === x.data().tenantID) {
                    arr.push(...arr,{...doc.data(),docID:doc.id})
                   setAllVideos(arr)
                   setIsLoading(false)
                  }
                })
              })


          }
        })
      
        
                    
      })


  }
  useEffect(() => {
    setAuthAndVideosOfCurrentUser();

  }, [])
console.log(allVideos)
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%", border: "4px solid #1976d2", marginTop: "10px" }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>Costumer Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Uploaded Video</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          
           {allVideos[0] ? allVideos.map(data=>{

          
           
           
            return  <TableRow
            key={data.docID}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {data.name}
            </TableCell>
            <TableCell >{data.email}</TableCell>
            <TableCell  >
              <Link href={data.videoURL} target="_blank"underline="hover">View Video</Link>
            </TableCell>
            <TableCell  >

              <Typography variant="p" color={data.videoStatus==="Pending" ? "blue" : data.videoStatus==="Approved" ? "green" : data.videoStatus === "Rejected" ? "red" : null}>{data.videoStatus}</Typography>
            </TableCell>
            <TableCell>
              <Button onClick={()=>{
                updateFirebaseDocValue(data.docID,"Approved");
                setAuthAndVideosOfCurrentUser();
              }}>APPROVE</Button>
              <Button onClick={()=>{
                updateFirebaseDocValue(data.docID,"Rejected");
                setAuthAndVideosOfCurrentUser();
              }}>REJECT</Button>
            </TableCell>
           
          </TableRow>  
           }) : <Typography variant="p" textAlign='center'>No Video Available!</Typography>}
           
        </TableBody>
      </Table>
    </TableContainer>


  );
}
export default VideoDetailsTable;