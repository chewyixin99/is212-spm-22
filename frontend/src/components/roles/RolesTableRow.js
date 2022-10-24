import React from 'react'
import propTypes from 'prop-types'

import { TableCell, TableRow } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import ActionMenu from '../common/ActionMenu'
import { STATUS } from '../../constants'

const RolesTableRow = ({ roleInfo }) => {
  const naviate = useNavigate()
  const actionMenuConfigs = [
    {
      itemName: 'View',
      itemAction: () => {
        naviate(`/admin/roles/${roleInfo?.role_id}`)
      },
    },
    {
      itemName: 'Edit',
      itemAction: () => {
        naviate(`/admin/roles/${roleInfo?.role_id}/edit`)
      },
    },
    {
      itemName: 'Remove',
      itemAction: () => {},
    },
  ]
  const getTextColor = () => {
    if (roleInfo.status === STATUS.RETIRED) {
      return 'red'
    } else if (roleInfo.status === STATUS.PENDING) {
      return 'orange'
    }
    return 'green'
  }

  return (
    <TableRow>
      <TableCell>{roleInfo?.role_id}</TableCell>
      <TableCell>{roleInfo?.role_name}</TableCell>
      <TableCell sx={{ color: getTextColor() }}>{roleInfo?.status}</TableCell>
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
