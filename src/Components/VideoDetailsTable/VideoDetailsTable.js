import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Link, Typography } from '@mui/material';
import { getAllTenantData, getAllVideoDetails, updateFirebaseVideosDocValue } from "../../Services/firebase";
const VideoDetailsTable = ({ user }) => {
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    getAllTenantData()
                  .then((response) => {
                    var arr = [];
                    response.forEach((x) => {
                      if (user.uid === x.data().userID) {
                        getAllVideoDetails()
                          .then(response => {
                            response.forEach((doc) => {
                              if (doc.data().tenantID === x.data().tenantID) {
                                arr.push(...arr, { ...doc.data(), docID: doc.id })
                                setAllVideos(arr)
                              }
                            })
                          })
                      }
                    })
                  })
  },[user])
  
  const setAndUpdateVideosDetails = () => {
    getAllTenantData()
                  .then((response) => {
                    var arr = [];
                    response.forEach((x) => {
                      if (user.uid === x.data().userID) {
                        getAllVideoDetails()
                          .then(response => {
                            response.forEach((doc) => {
                              if (doc.data().tenantID === x.data().tenantID) {
                                arr.push(...arr, { ...doc.data(), docID: doc.id })
                                setAllVideos(arr)
                              }
                            })
                          })
                      }
                    })
                  })
  }
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%", border: "4px solid #1976d2", marginTop: "10px" }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>Costumer Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Uploaded Video</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allVideos[0] ? allVideos.map(data => {
            return <TableRow
              key={data.docID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.name}
              </TableCell>
              <TableCell >{data.email}</TableCell>
              <TableCell  >
                <Link href={data.videoURL} target="_blank" underline="hover">View Video</Link>
              </TableCell>
              <TableCell  >

                <Typography variant="p">{data.msg}</Typography>
              </TableCell>
              <TableCell  >

                <Typography variant="p" color={data.videoStatus === "Pending" ? "blue" : data.videoStatus === "Approved" ? "green" : data.videoStatus === "Rejected" ? "red" : null}>{data.videoStatus}</Typography>
              </TableCell>
              <TableCell>
                <Button onClick={() => {

updateFirebaseVideosDocValue(data.docID, "Approved");
setAndUpdateVideosDetails();

                 
                }}>APPROVE</Button>
                <Button onClick={() => {
                  updateFirebaseVideosDocValue(data.docID, "Rejected");
                  setAndUpdateVideosDetails();
               
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