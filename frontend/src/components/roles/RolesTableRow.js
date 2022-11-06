import React, { useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { TableCell, TableRow } from '@mui/material'

import ActionMenu from '../common/ActionMenu'
import ConfirmationDialog from '../common/ConfirmationDialog'
import useDialogState from '../../services/common/useDialogState'
import editRoleService from '../../services/roles/editRoleService'
import { ROLES, STATUS } from '../../constants'

const RolesTableRow = ({ userRole, roleInfo, reloadData }) => {
  const naviate = useNavigate()
  const removeRoleDialogState = useDialogState()
  const [isLoading, setIsLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const actionMenuConfigs = [
    {
      itemName: 'View',
      itemAction: () => {
        naviate(`/${userRole.toLowerCase()}/roles/${roleInfo?.role_id}`)
      },
    },
  ]

  if (userRole === ROLES.ADMIN) {
    actionMenuConfigs.push(
      {
        itemName: 'Edit',
        itemAction: () => {
          naviate(`/admin/roles/${roleInfo?.role_id}/edit`)
        },
      },
      {
        itemName: 'Remove',
        itemAction: () => {
          removeRoleDialogState.open()
        },
      }
    )
  }

  const getTextColor = () => {
    if (roleInfo.status === STATUS.RETIRED) {
      return 'red'
    } else if (roleInfo.status === STATUS.PENDING) {
      return 'orange'
    }
    return 'green'
  }

  const retireRole = async () => {
    setIsLoading(true)
    editRoleService({
      roleId: roleInfo?.role_id,
      roleStatus: STATUS.RETIRED,
    })
      .then((response) => {
        if (response?.data) {
          enqueueSnackbar('Role successfully retired.', { variant: 'success' })
        } else {
          const errorMsg = response?.error
            ? response?.error
            : 'Unable to retire role. Please try again.'
          enqueueSnackbar(errorMsg, { variant: 'error' })
        }
      })
      .then(() => {
        setIsLoading(false)
        reloadData()
        removeRoleDialogState.close()
      })
  }

  const renderConfirmationDialog = () => {
    return (
      <ConfirmationDialog
        dialogTitle="Retire role?"
        dialogBody={`This action will retire the ${roleInfo?.role_name} role. Learning journeys that are dependent on this role will be notified of the retirement of this role.`}
        isOpen={removeRoleDialogState.isOpen}
        closeCallback={removeRoleDialogState.close}
        proceedCallback={retireRole}
        proceedButtonTitle="Retire"
        proceedColor="error"
        isLoading={isLoading}
      />
    )
  }

  return (
    <TableRow>
      <TableCell>{roleInfo?.role_id}</TableCell>
      <TableCell>{roleInfo?.role_name}</TableCell>
      <TableCell sx={{ color: getTextColor() }}>{roleInfo?.status}</TableCell>
      <TableCell align="right">
        <ActionMenu variant="kebab" menuItemConfigs={actionMenuConfigs} />
      </TableCell>
      {removeRoleDialogState.isOpen && renderConfirmationDialog()}
    </TableRow>
  )
}

RolesTableRow.propTypes = {
  userRole: propTypes.string,
  roleInfo: propTypes.shape({
    role_id: propTypes.number,
    role_name: propTypes.string,
    role_desc: propTypes.string,
    status: propTypes.string,
  }),
  reloadData: propTypes.func,
}

RolesTableRow.defaultProps = {
  userRole: ROLES.ADMIN,
}

export default RolesTableRow
