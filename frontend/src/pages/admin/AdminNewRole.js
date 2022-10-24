import React from 'react'

import { Box } from '@mui/material'

import SectionHeader from '../../components/common/SectionHeader'
import CreateEditRoleStepper from '../../components/roles/CreateEditRoleStepper'

function AdminNewRole() {
  return (
    <Box my={5}>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up('md')]: {
            width: '50%',
          },
          width: '80%',
          margin: 'auto',
        })}
      >
        <SectionHeader header="Create new role" />
        <CreateEditRoleStepper />
      </Box>
    </Box>
  )
}

export default AdminNewRole
