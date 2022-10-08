import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  id: number,
  name: string,
  field: string,
  // fat: number,
  // carbs: number,
  // protein: number,
) {
  return { id, name, field };
}

const rows = [
  createData(1, 'Sales Manager', 'Sales'),
  createData(2, 'Sales Rep', 'Sales'),
  createData(3, 'Operations Manager', 'Operations'),
  createData(4, 'Repair Engineer', 'Operations'),
  createData(5, 'Finance Manager', 'Finance'),
];

function RolesList() {
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>Role ID</TableCell>
            <TableCell align="left">Role Name</TableCell>
            <TableCell align="left">Field</TableCell>
            <TableCell align="left">Action</TableCell>
            {/* <TableCell align="left">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.field}</TableCell>
                <TableCell align="left">
                    {/* pass in the id */}
                    <button>View</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
  )
}

export default RolesList
