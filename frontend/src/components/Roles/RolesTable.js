import React, { useEffect } from 'react'
import propTypes from 'prop-types'

import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material'

import SectionHeader from '../common/SectionHeader'
import TableBodyLoader from '../common/TableBodyLoader'
import { DUMMYROLEDATA } from '../../constants'
import { getAllRoles } from '../../services/roles'

function RolesTable({ isAbbreviated }) {
  const isLoading = false // TODO: for data retrieval later on
  let tableData = []

  // TODO: Dispatch - if isAbbreviated retrieve top 5, else retrieve entire list
  if (isAbbreviated) {
    tableData = DUMMYROLEDATA.slice(0, 6)
  } else {
    tableData = DUMMYROLEDATA
  }

  useEffect(() => {
    getAllRoles().then((data) => {
      console.log(data)
    })
  }, [getAllRoles])

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBodyLoader isLoading />
        </Table>
      </TableContainer>
    </Box>
  )
}

RolesTable.propTypes = {
  isAbbreviated: propTypes.bool,
}

export default RolesTable
