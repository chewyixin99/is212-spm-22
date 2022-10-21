import React from 'react'
import propTypes from 'prop-types'

import { TableCell, TableRow } from '@mui/material'

import ActionMenu from '../common/ActionMenu'
import { STATUS, ENDPOINT } from '../../constants'
import { useNavigate } from 'react-router-dom'

const SkillsTableRow = ({ skillInfo }) => {
  const navigate = useNavigate()
  const { skill_desc, skill_id, skill_name, status } = skillInfo
  const actionMenuConfigs = [
    {
      itemName: 'View',
      itemAction: () => {
        navigate(`/admin/skills/${skill_id}`)
      },
    },
    {
      itemName: 'Edit',
      itemAction: () => {
        navigate(`/admin/skills/${skill_id}/edit`, {
          state: {
            skillState: {
              skillName: skill_name,
              skillId: skill_id,
              skillDesc: skill_desc,
              skillStatus: status,
            },
          },
        })
      },
    },
    {
      itemName: 'Remove',
      itemAction: () => {
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const url = `${ENDPOINT}/skills/${skill_id}`
        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((responseJSON) => {
            console.log(responseJSON)
            if (responseJSON.code > 399) {
              console.log(responseJSON.message)
            } else {
              window.location.reload()
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
    },
  ]

  let textColor
  if (skillInfo.status === STATUS.RETIRED) {
    textColor = 'red'
  } else if (skillInfo.status === STATUS.PENDING) {
    textColor = 'orange'
  } else {
    textColor = 'green'
  }

  return (
    <TableRow>
      <TableCell>{skillInfo?.skill_id}</TableCell>
      <TableCell>{skillInfo?.skill_name}</TableCell>
      <TableCell sx={{ color: textColor }}>{skillInfo?.status}</TableCell>
      <TableCell align="right">
        <ActionMenu variant="kebab" menuItemConfigs={actionMenuConfigs} />
      </TableCell>
    </TableRow>
  )
}

SkillsTableRow.propTypes = {
  skillInfo: propTypes.shape({
    skill_id: propTypes.number,
    skill_name: propTypes.string,
    status: propTypes.string,
  }),
}

export default SkillsTableRow
