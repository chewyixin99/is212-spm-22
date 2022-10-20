import React from 'react'
import {useState} from 'react';
import propTypes from 'prop-types'

import { TableCell, TableRow, Button, ButtonGroup } from '@mui/material'

import { STATUS } from '../../constants'

const RolesTableRow = ({ roleInfo }) => {
  const textColor = 
    roleInfo.status == STATUS.RETIRED
      ? 'red'
      : roleInfo.status == STATUS.PENDING
        ? 'orange'
        : 'green'

  // const [selectedid, setSelectedid] = useState('');
  // const [buttonText, setButtonText] = useState('Select');

  // const handleClick = (param) => {
    
  //   if (buttonText == 'Select'){
  //     setButtonText('Selected')
  //     setSelectedid(param)
  //   } else {
  //     setButtonText('Select')
  //     setSelectedid('')
  //   }
    
  // }
  // console.log(selectedid)
  // // console.log()

  const [selectedid, setSelectedid] = useState('');

  const renderButton = (param) => {
    // console.log(param)
    
    if (selectedid === param){
      return (
        <Button variant='contained' onClick={event => setSelectedid('')}>Selected</Button>
      )
    } else {
      return (
        <Button variant='outlined' onClick={event => setSelectedid(param)}>Select</Button>
      )
    }
  }
   
  console.log(selectedid)

  return (
    <TableRow>
      <TableCell>{roleInfo?.role_id}</TableCell>
      <TableCell>{roleInfo?.role_name}</TableCell>
      <TableCell sx={{ color: textColor }}>{roleInfo?.status}</TableCell>
      <TableCell align="center">
        {renderButton(roleInfo?.role_id)}
        {/* <Button variant="outlined" onClick={event => handleClick(roleInfo?.role_id)}>{buttonText}</Button> */}
      </TableCell>
    </TableRow>
  )
}

RolesTableRow.propTypes = {
  roleInfo: propTypes.shape({
    role_id: propTypes.number,
    role_name: propTypes.string,
    status: propTypes.string,
  }),
}

export default RolesTableRow
