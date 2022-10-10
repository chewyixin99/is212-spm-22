import React from 'react'
import propTypes from 'prop-types'

import { TableCell, TableRow } from '@mui/material'

import ActionMenu from '../common/ActionMenu'

const RolesTableRow = ({ roleInfo }) => {
  const actionMenuConfigs = [
    {
      itemName: 'View',
      itemAction: () => {},
    },
    {
      itemName: 'Edit',
      itemAction: () => {},
    },
    {
      itemName: 'Remove',
      itemAction: () => {},
    },
  ]

  return (
    <TableRow>
      <TableCell>{roleInfo?.role_id}</TableCell>
      <TableCell>{roleInfo?.role_name}</TableCell>
      <TableCell>{roleInfo?.status}</TableCell>
      <TableCell align="right">
        <ActionMenu variant="kebab" menuItemConfigs={actionMenuConfigs} />
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
