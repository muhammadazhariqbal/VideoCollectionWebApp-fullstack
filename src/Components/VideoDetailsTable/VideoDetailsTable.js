import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Tester', 'test@gmail.com', "www.google.com", "ac"),

];

const VideoDetailsTable = () => {
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%", border: "4px solid #1976d2", marginTop: "10px" }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>Costumer Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Uploaded Video</TableCell>
            <TableCell>Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.calories}</TableCell>
              <TableCell  >{row.fat}</TableCell>
              <TableCell  >{row.carbs}</TableCell>
              <TableCell  >{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


  );
}
export default VideoDetailsTable;