import React from 'react'

import { Box } from '@mui/material'

import RolesTable from '../../components/roles/RolesTable'
import SkillsTable from '../../components/skills/SkillsTable'

function AdmingHomePage() {
  return (
    <Box>
      <RolesTable isAbbreviated />
      <SkillsTable />
    </Box>
  )
}

export default AdmingHomePage
