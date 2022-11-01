import React from 'react'
import propTypes from 'prop-types'

import { LoadingButton } from '@mui/lab'
import { Box, Button } from '@mui/material'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { useOutletContext } from 'react-router-dom'

import { ROLES } from '../../constants'

const EditButtons = ({
  handleBackClick,
  handleDeleteClick,
  handleEditClick,
  isEditing,
  isDeleting,
  justifyContent,
  backButtonLabel,
  deleteButtonLabel,
  editButtonLabel,
}) => {
  const { role } = useOutletContext()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent,
      }}
    >
      <Button
        variant="outlined"
        sx={{ mr: 3 }}
        startIcon={<KeyboardArrowLeft />}
        onClick={handleBackClick}
      >
        {backButtonLabel}
      </Button>
      {role === ROLES.STAFF ? (
        <Box />
      ) : (
        <Box sx={{ display: 'flex' }}>
          <Box>
            <LoadingButton
              variant="contained"
              loading={isEditing}
              loadingPosition="end"
              onClick={handleEditClick}
            >
              {editButtonLabel}
            </LoadingButton>
          </Box>
          <Box ml={2}>
            <LoadingButton
              variant="contained"
              loading={isDeleting}
              loadingPosition="end"
              color="error"
              onClick={handleDeleteClick}
            >
              {deleteButtonLabel}
            </LoadingButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default EditButtons

EditButtons.propTypes = {
  handleBackClick: propTypes.func,
  handleDeleteClick: propTypes.func,
  handleEditClick: propTypes.func,
  isEditing: propTypes.bool,
  isDeleting: propTypes.bool,
  justifyContent: propTypes.string,
  backButtonLabel: propTypes.string,
  deleteButtonLabel: propTypes.string,
  editButtonLabel: propTypes.string,
}

EditButtons.defaultProps = {
  isDeleting: false,
  isEditing: false,
  justifyContent: 'space-between',
  backButtonLabel: 'Back',
  deleteButtonLabel: 'Delete',
  editButtonLabel: 'Edit',
}
