import React from 'react'
import {
    Box,
} from '@mui/material'

import SkillsTable from '../../components/skills/SkillsTable'

function AdminSkillsPage() {
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        <SkillsTable numRows={-1} />
      </Box>
    </Box>
  )
}

export default AdminSkillsPage
