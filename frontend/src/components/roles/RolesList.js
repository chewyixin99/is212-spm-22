import React from 'react'
import {
    Box,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
  } from '@mui/material'
  import PreviewIcon from '@mui/icons-material/Preview';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';

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
    <Box
      sx={(theme) => ({
        [theme.breakpoints.up('md')]: {
          width: '80%',
        },
        width: '80%',
        margin: 'auto',
      })}
    >
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
                    <PreviewIcon color="primary"></PreviewIcon>
                    <EditIcon color="primary"></EditIcon>
                    <DeleteIcon color="primary"></DeleteIcon>
                </TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    </Box>
  )
}

export default RolesList
