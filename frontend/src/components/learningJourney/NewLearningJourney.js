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
import { Link } from 'react-router-dom'

import SectionHeader from '../common/SectionHeader'
import RolesTableRow from '../learningJourney/RolesTableRow'
import TableRowEmptyStatus from '../common/TableRowEmptyStatus'
import TableRowLoadingStatus from '../common/TableRowLoadingStatus'
import useRolesLoader from '../../services/roles/useRolesLoader'

function NewLearningJourney({ numRows }) {
  const [roleData, isLoading, total, error] = useRolesLoader(numRows)
  // console.log('---> RolesTable, roleData: ', roleData)
  const isEmpty = roleData.length === 0

  const renderSubheader = () => {
    if (isLoading) {
      return 'Loading...'
    }
    if (isEmpty) {
      return 'Total Number of Roles: 0'
    }
    return `Total Number of Roles: ${total}`
  }

  const renderTableStatuses = () => {
    if (isLoading) {
      return <TableRowLoadingStatus cols={4} />
    } else if (!isLoading && !error && isEmpty) {
      return <TableRowEmptyStatus cols={4} content="No data available." />
    } else if (!isLoading && !isEmpty && error) {
      return (
        <TableRowEmptyStatus
          cols={4}
          content="Currently unable to retrieve data."
        />
      )
    }
  }

  const renderTableRows = () => {
    if (!isEmpty && !isLoading && !error && roleData) {
      return (
        <>
          {roleData.map((roleInfo, index) => (
            <RolesTableRow roleInfo={roleInfo} key={index} />
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
      <SectionHeader
        header="New Learning Journey"
        subHeader={renderSubheader()}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableStatuses()}
            {renderTableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

// RolesTable.propTypes = {
//   numRows: propTypes.number,
// }

export default NewLearningJourney

