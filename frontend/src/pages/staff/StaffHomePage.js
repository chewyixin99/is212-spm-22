import React from 'react'
import { Box } from '@mui/material'

import { useOutletContext } from 'react-router-dom'
import CoursesTable from '../../components/course/CoursesTable'
import LearningJourneysTable from '../../components/learningJourney/LearningJourneysTable'
import RolesTable from '../../components/roles/RolesTable'

const StaffHomePage = () => {
  const { staffId, role } = useOutletContext()

  return (
    <Box sx={{ margin: 'auto' }}>
      <Box my={5}>
        <LearningJourneysTable staffId={staffId} />
      </Box>

      <Box my={5}>
        <CoursesTable numRows={3} />
      </Box>

      <Box my={5}>
        <RolesTable numRows={3} role={role} />
      </Box>
    </Box>
  )
}

export default StaffHomePage
