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
import RolesTableRow from './RolesTableRow'
import TableRowEmptyStatus from '../common/TableRowEmptyStatus'
import TableRowLoadingStatus from '../common/TableRowLoadingStatus'
import useRolesLoader from '../../services/roles/useRolesLoader'
import { ROLES } from '../../constants'
import { toRenderTableRows } from '../componentsLib'

function RolesTable({ numRows, role }) {
  const [roleData, isLoading, total, error, reloadData] = useRolesLoader(
    numRows,
    null
  )
  // console.log('---> RolesTable, roleData: ', roleData)
  const isEmpty = total === 0

  const renderSubheader = () => {
    if (isLoading) {
      return 'Loading...'
    }
    if (isEmpty) {
      return 'Total: 0'
    }
    return `Total: ${total}`
  }

  const sectionButtonRenderer = () => {
    if (role === ROLES.STAFF) {
      if (numRows === -1) {
        return <Box />
      } else {
        return (
          <Box sx={{ display: 'flex' }}>
            <Box mx={1}>
              <Button variant="outlined" component={Link} to="roles">
                View All Roles
              </Button>
            </Box>
          </Box>
        )
      }
    }

    return numRows === -1 ? (
      <Box>
        <Button variant="outlined" component={Link} to="/admin/roles/newrole">
          Create New Role
        </Button>
      </Box>
    ) : (
      <Box sx={{ display: 'flex' }}>
        <Box mx={1}>
          <Button variant="outlined" component={Link} to="roles">
            View All Roles
          </Button>
        </Box>

        <Box>
          <Button variant="outlined" component={Link} to="/admin/roles/newrole">
            Create New Role
          </Button>
        </Box>
      </Box>
    )
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
    if (toRenderTableRows(isEmpty, isLoading, error) && roleData) {
      return (
        <>
          {roleData.map((roleInfo, index) => (
            <RolesTableRow
              userRole={role}
              roleInfo={roleInfo}
              reloadData={reloadData}
              key={index}
            />
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
        header="Roles"
        subHeader={renderSubheader()}
        sectionButtonComponent={sectionButtonRenderer()}
      />

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
            {renderTableStatuses()}
            {renderTableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

RolesTable.propTypes = {
  numRows: propTypes.number,
  role: propTypes.string,
}

RolesTable.defaultProps = {
  role: ROLES.ADMIN,
}

export default RolesTable
