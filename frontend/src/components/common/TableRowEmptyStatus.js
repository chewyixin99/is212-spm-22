import React from 'react'
import PropTypes from 'prop-types'
import { Typography, TableRow, TableCell } from '@mui/material'

const TableRowEmptyStatus = ({ cols, content }) => {
  return (
    <TableRow>
      <TableCell colSpan={cols} sx={{ borderBottom: 'none' }}>
        <Typography variant="h4" textAlign="center">
          {content}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

TableRowEmptyStatus.propTypes = {
  cols: PropTypes.number,
  content: PropTypes.string,
}
export default TableRowEmptyStatus
