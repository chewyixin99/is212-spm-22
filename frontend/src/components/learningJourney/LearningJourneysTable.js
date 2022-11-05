import React, { useEffect } from 'react'

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

const LearningJourneysTable = () => {
  // eslint-disable-next-line
  const [
    learningJourneyData,
    isLoading,
    total,
    error,
    reloadData, // eslint-disable-next-line
  ] = useAllLearningJourneysLoader()

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
    return (
      <Box>
        <Button variant="outlined" component={Link} to="new">
          Create New Learning Journey
        </Button>
      </Box>
    )
  }

  const renderTableStatuses = () => {
    console.log('---> isLoading: ', isLoading)
    console.log('---> error: ', error)
    console.log('---> isEmpty: ', isEmpty)

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
    if (!isEmpty && !isLoading && !error && learningJourneyData) {
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

export default LearningJourneysTable
