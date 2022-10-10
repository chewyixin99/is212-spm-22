import React from 'react'
import propTypes from 'prop-types'

import { TableCell, TableRow } from '@mui/material'

import ActionMenu from '../common/ActionMenu'
import { STATUS } from '../../constants'

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
  const textColor = 
    roleInfo.status == STATUS.RETIRED
      ? 'red'
      : roleInfo.status == STATUS.PENDING
        ? 'orange'
        : 'green'

  return (
    <TableRow>
      <TableCell>{roleInfo?.role_id}</TableCell>
      <TableCell>{roleInfo?.role_name}</TableCell>
      <TableCell sx={{ color: textColor }}>{roleInfo?.status}</TableCell>
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
