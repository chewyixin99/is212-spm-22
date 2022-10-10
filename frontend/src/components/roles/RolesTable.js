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
  TableBody,
  Button,
} from '@mui/material'

import SectionHeader from '../common/SectionHeader'
import RolesTableRow from './RolesTableRow'
import TableRowEmptyStatus from '../common/TableRowEmptyStatus'
import TableRowLoadingStatus from '../common/TableRowLoadingStatus'
import useRolesLoader from '../../services/roles/useRolesLoader'

import {
  Link
} from 'react-router-dom'

function RolesTable({ isAbbreviated }) {
  const [roleData, isLoading] = useRolesLoader(null, isAbbreviated)

  // console.log('---> RolesTable, roleData: ', roleData)
  const isEmpty = roleData.length === 0

  const renderSubheader = () => {
    if (isLoading) {
      return 'Loading...'
    }
    if (isEmpty) {
      return 'Total: 0'
    }
    return `Total: ${roleData.length}`
  }

  const renderTableRows = () => {
    if (!isEmpty && !isLoading && roleData) {
      return (
        <>
          {roleData.map((roleInfo) => (
            <RolesTableRow roleInfo={roleInfo} />
          ))}
        </>
      )
    }
  }

  return (
    <Box
      sx={(theme) => ({
        [theme.breakpoints.up('md')]: {
          width: '50%',
        },
        width: '80%',
        margin: 'auto',
      })}
    >
      <SectionHeader header="Roles" subHeader={renderSubheader()} />
      <Button variant="outlined" component={Link} to="roles">
              View All Roles
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <TableRowLoadingStatus cols={4} />}
            {!isLoading && isEmpty && (
              <TableRowEmptyStatus cols={4} content="No data available." />
            )}
            {renderTableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

RolesTable.propTypes = {
  isAbbreviated: propTypes.bool,
}

export default RolesTable
