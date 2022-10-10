import React from 'react'
import propTypes from 'prop-types'

import { TableCell, TableRow } from '@mui/material'

import ActionMenu from '../common/ActionMenu'
import { STATUS } from '../../constants'

const SkillsTableRow = ({ skillInfo }) => {
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
    skillInfo.status == STATUS.RETIRED
      ? 'red'
      : skillInfo.status == STATUS.PENDING
        ? 'orange'
        : 'green'

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
