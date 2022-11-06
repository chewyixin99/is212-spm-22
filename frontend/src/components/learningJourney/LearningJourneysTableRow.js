import React, { useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

import ActionMenu from '../common/ActionMenu'
import ConfirmationDialog from '../common/ConfirmationDialog'
import deleteLearningJourneyService from '../../services/learningJourneys/deleteLearningJourneyService'
import useDialogState from '../../services/common/useDialogState'

const LearningJourneysTableRow = ({ learningJourneyInfo, reloadData }) => {
  const naviate = useNavigate()
  const removeRoleDialogState = useDialogState()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const actionMenuConfigs = [
    {
      itemName: 'View',
      itemAction: () => {
        naviate(`${learningJourneyInfo?.learning_journey_id}`)
      },
    },
    {
      itemName: 'Edit',
      itemAction: () => {
        naviate(`${learningJourneyInfo?.learning_journey_id}/edit`)
      },
    },
    {
      itemName: 'Remove',
      itemAction: () => {
        removeRoleDialogState.open()
      },
    },
  ]

  const deleteLearningJourney = async () => {
    setIsLoading(true)
    deleteLearningJourneyService(learningJourneyInfo?.learning_journey_id)
      .then((response) => {
        if (response?.data) {
          enqueueSnackbar('Learning journey successfully deleted.', {
            variant: 'success',
          })
        } else {
          const errorMsg = response?.error
            ? response?.error
            : 'Unable to delete learning journey. Please try again.'
          enqueueSnackbar(errorMsg, { variant: 'error' })
        }
      })
      .then(() => {
        setIsLoading(false)
        reloadData()
        removeRoleDialogState.close()
      })
  }

  const renderConfirmationDialog = () => {
    return (
      <ConfirmationDialog
        dialogTitle="Delete learning journey?"
        dialogBody={`This action will delete the ${learningJourneyInfo?.learning_journey_name} learning journey.`}
        isOpen={removeRoleDialogState.isOpen}
        closeCallback={removeRoleDialogState.close}
        proceedCallback={deleteLearningJourney}
        proceedButtonTitle="Delete"
        proceedColor="error"
        isLoading={isLoading}
      />
    )
  }

  return (
    <>
      <TableRow>
        <TableCell sx={{ borderBottom: 'none' }}>
          <IconButton size="small" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>
          {learningJourneyInfo?.learning_journey_name}
        </TableCell>
        <TableCell align="right" sx={{ borderBottom: 'none' }}>
          <ActionMenu variant="kebab" menuItemConfigs={actionMenuConfigs} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body">
                Can put more info in the futue (Previously was loading bar).
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {renderConfirmationDialog()}
    </>
  )
}

export default LearningJourneysTableRow

LearningJourneysTableRow.propTypes = {
  learningJourneyInfo: propTypes.object,
  reloadData: propTypes.func,
}
