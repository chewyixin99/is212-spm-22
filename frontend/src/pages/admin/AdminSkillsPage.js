import React, { useState } from 'react'
import { Box } from '@mui/material'

import SkillsTable from '../../components/skills/SkillsTable'
import { useLocation } from 'react-router-dom'
import SnackbarAlert from '../../components/common/SnackbarAlert'

function AdminSkillsPage() {
  const location = useLocation()
  const [ snackbarState, setSnackbarState ] = useState(location.state?.snackbarState)

  return (
    <Box>
      <Box sx={{ my: 5 }}>
        <SkillsTable numRows={-1} />
      </Box>
      <SnackbarAlert
        snackbarState={snackbarState}
        alertMessage='Skill successfully created'
        alertSeverity='success'
      >  
      </SnackbarAlert>
    </Box>
  )
}

export default AdminSkillsPage
