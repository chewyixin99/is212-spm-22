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
import CoursesTableRow from './CoursesTableRow'
import TableRowEmptyStatus from '../common/TableRowEmptyStatus'
import TableRowLoadingStatus from '../common/TableRowLoadingStatus'
import useCoursesLoader from '../../services/courses/useCoursesLoader'

function CoursesTable({ numRows }) {
  const [coursesData, isLoading, total, error] = useCoursesLoader(numRows)

  // console.log('---> CoursesTable, coursesData: ', coursesData)
  const isEmpty = coursesData.length === 0

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
    return numRows === -1 ? (
      <Box sx={{ my: 1 }}></Box>
    ) : (
      <Box sx={{ display: 'flex' }}>
        <Box mx={1}>
          <Button variant="outlined" component={Link} to="courses">
            View All Courses
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
    if (!isEmpty && !isLoading && !error && coursesData) {
      return (
        <>
          {coursesData.map((courseInfo, index) => (
            <CoursesTableRow courseInfo={courseInfo} key={index} />
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
        header="Courses"
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

CoursesTable.propTypes = {
  numRows: propTypes.number,
}

export default CoursesTable
