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
  TableBody,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'

import SectionHeader from '../common/SectionHeader'
import LearningJourneysTableRow from './LearningJourneysTableRow'
import useAllLearningJourneysLoader from '../../services/learningJourneys/useAllLearningJourneysLoader'
import TableRowLoadingStatus from '../common/TableRowLoadingStatus'
import TableRowEmptyStatus from '../common/TableRowEmptyStatus'
import useStaffLearningJourneyLoader from '../../services/learningJourneys/useStaffLearningJourneyLoader'
import { toRenderTableRows } from '../componentsLib'

const LearningJourneysTable = ({ staffId, numRows }) => {
  // eslint-disable-next-line
  const [
    learningJourneyData,
    isLoading,
    total,
    error,
    reloadData, // eslint-disable-next-line
  ] =
    staffId > 0
      ? useStaffLearningJourneyLoader(staffId)
      : useAllLearningJourneysLoader()
  let isEmpty = total === 0
  useEffect(() => {
    isEmpty = total === 0
  }, [total])

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
      <Box>
        <Button
          variant="outlined"
          component={Link}
          to="/staff/learning-journey/new"
        >
          Create
        </Button>
      </Box>
    ) : (
      <Box sx={{ display: 'flex' }}>
        <Box mx={1}>
          <Button
            variant="outlined"
            component={Link}
            to="/staff/learning-journey"
          >
            View All
          </Button>
        </Box>

        <Box>
          <Button
            variant="outlined"
            component={Link}
            to="/staff/learning-journey/new"
          >
            Create
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
          cols={3}
          content="Currently unable to retrieve data."
        />
      )
    }
  }

  const renderTableRows = () => {
    if (toRenderTableRows(isEmpty, isLoading, error) && learningJourneyData) {
      return (
        <>
          {learningJourneyData.map((learningJourneyInfo, index) => (
            <LearningJourneysTableRow
              learningJourneyInfo={learningJourneyInfo}
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
        header="Learning Journeys"
        subHeader={renderSubheader()}
        sectionButtonComponent={sectionButtonRenderer()}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="10%" />
              <TableCell>Learning Journey Name</TableCell>
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

LearningJourneysTable.propTypes = {
  staffId: propTypes.number,
  numRows: propTypes.number,
}

LearningJourneysTable.defaultProps = {
  staffId: 0,
}

export default LearningJourneysTable
