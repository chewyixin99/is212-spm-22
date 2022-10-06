import React from 'react'
import propTypes from 'prop-types'

import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'

import SectionHeader from '../common/SectionHeader'
import { DUMMYROLEDATA } from '../../constants'

function RolesTable({ isAbbreviated }) {
  const isLoading = false // TODO: for data retrieval later on
  let tableData = []

  // TODO: Dispatch - if isAbbreviated retrieve top 5, else retrieve entire list
  if (isAbbreviated) {
    tableData = DUMMYROLEDATA.slice(0, 6)
  } else {
    tableData = DUMMYROLEDATA
  }

  const renderSubheader = () => {
    if (isLoading) {
      return 'Loading...'
    }
    if (tableData.length === 0) {
      return 'Total: 0'
    }
    return `Total: ${tableData.length}`
  }

  return (
    <Box sx={{ width: '50%', margin: 'auto' }}>
      <SectionHeader header="Roles" subHeader={renderSubheader()} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody />
        </Table>
      </TableContainer>
    </Box>
  )
}

RolesTable.propTypes = {
  isAbbreviated: propTypes.bool,
}

export default RolesTable
