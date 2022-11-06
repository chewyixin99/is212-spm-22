import React, { useState } from 'react'
import propTypes from 'prop-types'

import { TableCell, TableRow, Button } from '@mui/material'

import { getTextColor } from '../componentsLib'

const RolesTableRow = (props) => {
  const roleInfo = props.roleInfo
  const textColor = getTextColor(roleInfo.status)

  const renderButton = (id, name) => {
    if (props.selectedRoleId === id) {
      return <Button variant="contained">Selected</Button>
    } else {
      return (
        <Button variant="outlined" onClick={(event) => props.getData(id, name)}>
          Select
        </Button>
      )
    }
  }

  useState(() => {}, [props.selectedRoleId])

  return (
    <TableRow>
      <TableCell>{roleInfo?.role_id}</TableCell>
      <TableCell>{roleInfo?.role_name}</TableCell>
      <TableCell sx={{ color: textColor }}>{roleInfo?.status}</TableCell>
      <TableCell align="center">
        {renderButton(roleInfo?.role_id, roleInfo?.role_name)}
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
