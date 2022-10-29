import React from 'react'
import propTypes from 'prop-types'

import { Box, Typography } from '@mui/material'

const DescriptionRow = ({ title, value }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{ color: 'text.secondary' }}
        variant="subtitle1"
        display="block"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography variant="body2" display="block" gutterBottom>
        {value}
      </Typography>
    </Box>
  )
}

DescriptionRow.propTypes = {
  title: propTypes.string,
  value: propTypes.string,
}

export default DescriptionRow
