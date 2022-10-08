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
} from '@mui/material'

import SectionHeader from '../common/SectionHeader'
import SkillsTableRow from './SkillsTableRow'
import TableRowEmptyStatus from '../common/TableRowEmptyStatus'
import TableRowLoadingStatus from '../common/TableRowLoadingStatus'
import useSkillsLoader from '../../services/skills/useSkillsLoader'

function SkillsTable({ isAbbreviated }) {
  const [skillData, isLoading] = useSkillsLoader(null, isAbbreviated)

  // console.log('---> SkillsTable, skillData: ', skillData)
  const isEmpty = skillData.length === 0

  const renderSubheader = () => {
    if (isLoading) {
      return 'Loading...'
    }
    if (isEmpty) {
      return 'Total: 0'
    }
    return `Total: ${skillData.length}`
  }

  const renderTableRows = () => {
    if (!isEmpty && !isLoading && skillData) {
      return (
        <>
          {skillData.map((skillInfo) => (
            <SkillsTableRow skillInfo={skillInfo} />
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
      <SectionHeader header="Skills" subHeader={renderSubheader()} />
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

SkillsTable.propTypes = {
  isAbbreviated: propTypes.bool,
}

export default SkillsTable
