import React from 'react'
import { useParams } from 'react-router-dom'

import { Box } from '@mui/material'

import SectionHeader from '../../components/common/SectionHeader'
import CreateEditRoleStepper from '../../components/roles/CreateEditRoleStepper'
import useRolesLoader from '../../services/roles/useRolesLoader'
import useRolesSkillsLoader from '../../services/roles/useRolesSkillsLoader'
import useSkillsLoader from '../../services/skills/useSkillsLoader'

const AdminEditRole = () => {
  const params = useParams()
  const [rolesInitialData, rolesLoading] = useRolesLoader(-1, params?.role_id)
  const [skillsInitialData, skillsLoading] = useRolesSkillsLoader(
    params?.role_id
  )
  const [allSkillsData, allSkillsLoading] = useSkillsLoader()

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
          rolesInitialData={rolesInitialData}
          skillsInitialData={skillsInitialData}
          allSkillsData={allSkillsData}
          rolesLoading={rolesLoading}
          skillsLoading={skillsLoading}
          allSkillsLoading={allSkillsLoading}
        />
      </Box>
    </Box>
  )
}

export default AdminEditRole
