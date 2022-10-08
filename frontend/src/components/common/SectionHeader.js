import React from 'react'
import propTypes from 'prop-types'

import { Box, Typography } from '@mui/material'

const SectionHeader = ({ header, subHeader }) => {
  const renderHeader = () => (
    <Typography variant="h4" gutterBottom>
      {header}
    </Typography>
  )

  const renderSubHeader = () => (
    <Typography variant="h6" gutterBottom>
      {subHeader}
    </Typography>
  )

  return (
    <Box>
      {header && renderHeader()}
      {subHeader && renderSubHeader()}
    </Box>
  )
}

SectionHeader.propTypes = {
  header: propTypes.string,
  subHeader: propTypes.string,
}

export default SectionHeader
