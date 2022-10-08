import React from 'react'

import { Box } from '@mui/material'

import RolesTable from '../../components/roles/RolesTable'
import SkillsTable from '../../components/skills/SkillsTable'

function AdminHomePage() {
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        <RolesTable isAbbreviated />
      </Box>
      <Box sx={{ my: 5 }}>
        <SkillsTable />
      </Box>
    </Box>
  )
}

export default AdminHomePage
