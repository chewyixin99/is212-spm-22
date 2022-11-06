import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { Box } from '@mui/material'

import RolesTable from '../../components/roles/RolesTable'

const StaffRolesPage = () => {
  const { role } = useOutletContext()

  return (
    <Box>
      <Box sx={{ my: 5 }}>
        <RolesTable role={role} numRows={-1} />
      </Box>
    </Box>
  )
}

export default StaffRolesPage
