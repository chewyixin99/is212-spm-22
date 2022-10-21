import React, { useContext, useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { Box, Grid, FormLabel, TextField } from '@mui/material'

import CreateRoleFormContext from '../../contexts/roles/CreateRoleFormContext'
import BackNextButtons from '../common/BackNextButtons'
import createRoleService from '../../services/roles/createRoleService'

const CreateRoleFormPreview = ({ handleBack }) => {
  const roleFormContext = useContext(CreateRoleFormContext)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
    createRoleService(roleFormContext.roleFormValues).then((response) => {
      if (response?.data) {
        navigate('/admin/roles')
        enqueueSnackbar('Role successfully created.', { variant: 'success' })
        setIsSubmitting(false)
      } else {
        const errorMsg = response?.error
          ? response?.error
          : 'Unable to create role. Please try again.'

        enqueueSnackbar(errorMsg, { variant: 'error' })
        setIsSubmitting(false)
      }
    })
  }

  return (
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
  )
}

export default CreateRoleFormPreview

CreateRoleFormPreview.propTypes = {
  handleBack: propTypes.func,
}
