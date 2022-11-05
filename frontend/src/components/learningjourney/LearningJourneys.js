import React from 'react'
import { Box } from '@mui/material'

import LearningJourneysTable from './LearningJourneysTable'

const LearningJourneys = () => {
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        <LearningJourneysTable />
      </Box>
    </Box>
  )
}

export default LearningJourneys
