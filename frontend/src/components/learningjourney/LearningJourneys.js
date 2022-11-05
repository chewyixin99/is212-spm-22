import React from 'react'
import { Box } from '@mui/material'

import LearningJourneysTable from './LearningJourneysTable'

const LearningJourneys = () => {
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        <LearningJourneysTable staffId={130001} numRows={-1} />
      </Box>
    </Box>
  )
}

export default LearningJourneys
