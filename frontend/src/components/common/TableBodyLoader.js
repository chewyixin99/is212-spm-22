import React from 'react'
import propTypes from 'prop-types'

import { Box, TableBody, Typography, CircularProgress } from '@mui/material'

// Displays spinner while loading and empty table placeholder if no data
const TableBodyLoader = ({ isLoading, isEmpty, content }) => {
  const renderTableBodyLoader = () => (
    <Box>
      <CircularProgress color="success" />
    </Box>
  )

  const renderEmptyTable = () => (
    <Box>
      <Typography variant="h4" textAlign="center">
        {content}
      </Typography>
    </Box>
  )

  return (
    <TableBody
      sx={{
        display: !isLoading && !isEmpty ? 'none' : 'flex',
        maxheight: 440,
        minHeight: 440,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLoading && !isEmpty && renderTableBodyLoader()}
      {!isLoading && isEmpty && renderEmptyTable()}
    </TableBody>
  )
}

TableBodyLoader.propTypes = {
  isLoading: propTypes.bool,
  isEmpty: propTypes.bool,
  content: propTypes.string,
}

TableBodyLoader.defaultProps = {
  content: 'No data available...',
}

export default TableBodyLoader
