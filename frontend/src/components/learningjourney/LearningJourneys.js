import React from 'react'
import { Box } from '@mui/material'

import LearningJourneysTable from './LearningJourneysTable'
import { useOutletContext } from 'react-router-dom'

const LearningJourneys = () => {
  const { staffId } = useOutletContext()
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        <LearningJourneysTable staffId={staffId} numRows={-1} />
      </Box>
    </Box>
  )
}

export default LearningJourneys
