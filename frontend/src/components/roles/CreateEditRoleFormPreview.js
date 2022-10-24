import React, { useContext, useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { Box, Grid, FormLabel, TextField, Slide } from '@mui/material'

import CreateEditRoleFormContext from '../../contexts/roles/createEditRoleFormContext'
import BackNextButtons from '../common/BackNextButtons'
import createRoleService from '../../services/roles/createRoleService'
import editRoleService from '../../services/roles/editRoleService'

const CreateEditRoleFormPreview = ({ handleBack, enter, edit }) => {
  const roleFormContext = useContext(CreateEditRoleFormContext)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    const action = edit ? editRoleService : createRoleService

    action(roleFormContext.roleFormValues)
      .then((response) => {
        if (response?.data) {
          navigate('/admin/roles')
          enqueueSnackbar(
            `Role successfully ${edit ? 'updated' : 'created'}.`,
            { variant: 'success' }
          )
        } else {
          const errorMsg = response?.error
            ? response?.error
            : `Unable to ${edit ? 'update' : 'create'} role. Please try again.`
          enqueueSnackbar(errorMsg, { variant: 'error' })
        }
      })
      .then(() => setIsSubmitting(false))
  }

  return (
    <Slide direction="left" in={enter}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Box mb={1.5}>
            <FormLabel>Role Name</FormLabel>
          </Box>
          <TextField
            disabled
            value={roleFormContext.roleFormValues.roleName}
            fullWidth
          />
        </Grid>
        <Grid item sm={12}>
          <Box mb={1.5}>
            <FormLabel>Role Description</FormLabel>
          </Box>
          <TextField
            disabled
            value={roleFormContext.roleFormValues.roleDesc}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item sm={12}>
          <Box mb={1.5}>
            <FormLabel>Role Status</FormLabel>
          </Box>
          <TextField
            disabled
            value={roleFormContext.roleFormValues.roleStatus}
            fullWidth
          />
        </Grid>
        <Grid item sm={12}>
          <Box my={5}>
            <BackNextButtons
              handleBackClick={handleBack}
              handleNextClick={handleSubmit}
              isLoading={isSubmitting}
              nextButtonLabel="Complete"
            />
          </Box>
        </Grid>
      </Grid>
    </Slide>
  )
}

export default CreateEditRoleFormPreview

CreateEditRoleFormPreview.propTypes = {
  handleBack: propTypes.func,
  enter: propTypes.bool,
  edit: propTypes.bool,
}

CreateEditRoleFormPreview.defaultProps = {
  enter: false,
  edit: false,
}
