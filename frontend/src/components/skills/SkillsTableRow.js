import React, { useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { TableCell, TableRow } from '@mui/material'

import ActionMenu from '../common/ActionMenu'
import { ENDPOINT, ROLES } from '../../constants'
import ConfirmationDialog from '../common/ConfirmationDialog'
import useDialogState from '../../services/common/useDialogState'
import { getTextColor } from '../componentsLib'

const SkillsTableRow = ({ skillInfo, reloadData }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const removeSkillDialogState = useDialogState(false)
  const { enqueueSnackbar } = useSnackbar()
  const {
    skill_desc: skillDesc,
    skill_id: skillId,
    skill_name: skillName,
    status: skillStatus,
  } = skillInfo
  const { role } = useOutletContext()

  const adminActionMenuConfigs = [
    {
      itemName: 'View',
      itemAction: () => {
        navigate(`/${role.toLowerCase()}/skills/${skillId}`)
      },
    },
    {
      itemName: 'Edit',
      itemAction: () => {
        navigate(`/${role.toLowerCase()}/skills/${skillId}/edit`, {
          state: {
            skillState: {
              skillName,
              skillId,
              skillDesc,
              skillStatus,
            },
          },
        })
      },
    },
    {
      itemName: 'Remove',
      itemAction: removeSkillDialogState.open,
    },
  ]

  const staffActionMenuConfigs = [
    {
      itemName: 'View',
      itemAction: () => {
        navigate(`/${role.toLowerCase()}/skills/${skillId}`)
      },
    },
  ]

  const textColor = getTextColor(skillInfo.status)

  const removeSkill = () => {
    setIsLoading(true)
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const url = `${ENDPOINT}/skills/${skillId}`
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        const message = responseJSON?.message
        if (responseJSON.code > 399) {
          enqueueSnackbar(
            message || 'Unable to delete skill. Please try again.',
            { variant: 'error' }
          )
        } else {
          enqueueSnackbar('Skill successfully deleted.', { variant: 'success' })
        }
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar('Unable to delete skill. Please try again.', {
          variant: 'error',
        })
      })
      .finally(() => {
        setIsLoading(false)
        reloadData()
        removeSkillDialogState.close()
      })
  }

  const renderRemoveSkillDialog = () => {
    return (
      <ConfirmationDialog
        dialogTitle="Delete skill?"
        dialogBody={`Once you delete this skill, you will not be able to recover it.
        Consider want to setting status to "Retired" instead.`}
        isOpen={removeSkillDialogState.isOpen}
        closeCallback={removeSkillDialogState.close}
        proceedCallback={removeSkill}
        proceedButtonTitle="Delete"
        proceedColor="error"
        isLoading={isLoading}
      />
    )
  }

  return (
    <TableRow>
      <TableCell>{skillInfo?.skill_id}</TableCell>
      <TableCell>{skillInfo?.skill_name}</TableCell>
      <TableCell sx={{ color: textColor }}>{skillInfo?.status}</TableCell>
      <TableCell align="right">
        <ActionMenu
          variant="kebab"
          menuItemConfigs={
            role === ROLES.STAFF
              ? staffActionMenuConfigs
              : adminActionMenuConfigs
          }
        />
      </TableCell>
      {removeSkillDialogState.isOpen && renderRemoveSkillDialog()}
    </TableRow>
  )
}

SkillsTableRow.propTypes = {
  skillInfo: propTypes.shape({
    skill_id: propTypes.number,
    skill_name: propTypes.string,
    skill_desc: propTypes.string,
    status: propTypes.string,
  }),
  reloadData: propTypes.func,
}

export default SkillsTableRow
