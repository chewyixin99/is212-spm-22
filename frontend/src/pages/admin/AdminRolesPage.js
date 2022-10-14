import React from 'react'
import { Box } from '@mui/material'

import RolesTable from '../../components/roles/RolesTable'

function AdminRolesPage() {
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        <RolesTable numRows={-1} />
      </Box>
    </Box>
  )
}

export default AdminRolesPage
