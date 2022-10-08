import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress, TableCell, TableRow } from '@mui/material'

const TableRowLoadingStatus = ({ cols }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={cols}
        sx={{ borderBottom: 'none', textAlign: 'center' }}
      >
        <CircularProgress color="success" />
      </TableCell>
    </TableRow>
  )
}

TableRowLoadingStatus.propTypes = {
  cols: PropTypes.number,
}
export default TableRowLoadingStatus
