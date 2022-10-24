import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from '@mui/material'

import SectionHeader from '../../components/common/SectionHeader'
import CreateEditRoleStepper from '../../components/roles/CreateEditRoleStepper'
import useRolesLoader from '../../services/roles/useRolesLoader'

const AdminEditRole = () => {
  const params = useParams()
  const [roleData, isLoading, , error] = useRolesLoader(-1, params?.role_id)
  console.log('AdminEditRole, errors: ', error)

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
        <SectionHeader header="Edit role" />
        <CreateEditRoleStepper
          edit
          initialData={roleData}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  )
}

export default AdminEditRole
