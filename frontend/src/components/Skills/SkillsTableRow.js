import React from 'react'
import propTypes from 'prop-types'

import { TableCell, TableRow } from '@mui/material'

import ActionMenu from '../common/ActionMenu'

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

  return (
    <TableRow>
      <TableCell>{skillInfo?.skill_id}</TableCell>
      <TableCell>{skillInfo?.skill_name}</TableCell>
      <TableCell>{skillInfo?.status}</TableCell>
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
