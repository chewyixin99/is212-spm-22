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
  Typography,
} from '@mui/material'

import { Link, useOutletContext } from 'react-router-dom'

import SectionHeader from '../common/SectionHeader'
import SkillsTableRow from './SkillsTableRow'
import TableRowEmptyStatus from '../common/TableRowEmptyStatus'
import TableRowLoadingStatus from '../common/TableRowLoadingStatus'
import useSkillsLoader from '../../services/skills/useSkillsLoader'
import { ROLES } from '../../constants'
import { toRenderTableRows } from '../componentsLib'

function SkillsTable({ numRows, staffId, completed, header = 'Skills' }) {
  const [skillData, isLoading, total, error, reloadData] = useSkillsLoader(
    numRows,
    staffId,
    completed
  )
  const { role } = useOutletContext()

  // console.log('---> SkillsTable, skillData: ', skillData)
  const isEmpty = skillData.length === 0

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
      <Box sx={{ my: 1 }}>
        {role === ROLES.STAFF || completed ? (
          <Typography />
        ) : (
          <Button variant="outlined" component={Link} to="/admin/newskill">
            Create New Skill
          </Button>
        )}
      </Box>
    ) : (
      <Box sx={{ display: 'flex' }}>
        <Box mx={1}>
          <Button variant="outlined" component={Link} to="skills">
            View All Skills
          </Button>
        </Box>

        {role === ROLES.STAFF || completed ? (
          <Typography />
        ) : (
          <Box>
            <Button variant="outlined" component={Link} to="/admin/newskill">
              Create New Skills
            </Button>
          </Box>
        )}
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
    if (toRenderTableRows(isEmpty, isLoading, error) && skillData) {
      return (
        <>
          {skillData.map((skillInfo, index) => (
            <SkillsTableRow
              skillInfo={skillInfo}
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
        header={header}
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

SkillsTable.propTypes = {
  numRows: propTypes.number,
  completed: propTypes.bool,
  staffId: propTypes.number,
  header: propTypes.string,
}

export default SkillsTable
