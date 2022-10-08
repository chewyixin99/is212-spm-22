import React from 'react'
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
import useRolesLoader from '../../services/roles/useRolesLoader'

function RolesTable({ isAbbreviated }) {
  const [roleData, isLoading] = useRolesLoader(null, isAbbreviated)

  // console.log('---> RolesTable, roleData: ', roleData)

  const renderSubheader = () => {
    if (isLoading) {
      return 'Loading...'
    }
    if (roleData.length === 0) {
      return 'Total: 0'
    }
    return `Total: ${roleData.length}`
  }

  console.log(isLoading)

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
          <TableBodyLoader isLoadin={isLoading} />
        </Table>
      </TableContainer>
    </Box>
  )
}

RolesTable.propTypes = {
  isAbbreviated: propTypes.bool,
}

export default RolesTable
