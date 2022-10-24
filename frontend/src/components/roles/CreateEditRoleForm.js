import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Formik, Field, Form } from 'formik'

import {
  Grid,
  Box,
  TextField,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Slide,
  Skeleton,
} from '@mui/material'

import { STATUS } from '../../constants'
import CreateEditRoleFormSchema from '../../schemas/createEditRoleFormSchema'
import CreateEditRoleFormContext from '../../contexts/roles/createEditRoleFormContext'
import BackNextButtons from '../common/BackNextButtons'

const CreateEditRoleForm = ({ handleNext, handleBack, enter, isLoading }) => {
  const roleFormContext = useContext(CreateEditRoleFormContext)
  console.log('CreateEditRoleForm, roleFormContext: ', roleFormContext)

  const renderRoleNameField = (touched, errors) => {
    if (isLoading) {
      return <Skeleton variant="rounded" />
    }
    return (
      <Field
        as={TextField}
        fullWidth
        name="roleName"
        label="Enter role name"
        error={touched.roleName && errors.roleName}
        helperText={touched.roleName && errors.roleName ? errors.roleName : ''}
      />
    )
  }

  const renderDescriptionField = (touched, errors) => {
    if (isLoading) {
      return <Skeleton variant="rounded" height={125} />
    }
    return (
      <Field
        as={TextField}
        fullWidth
        multiline
        rows={4}
        error={touched.roleDesc && errors.roleDesc}
        helperText={touched.roleDesc && errors.roleDesc ? errors.roleDesc : ''}
        name="roleDesc"
        label="Enter role description"
      />
    )
  }

  const renderStatusRadioGroup = (values, errors, touched, handleChange) => {
    if (isLoading) {
      return <Skeleton variant="rounded" width="50%" />
    }
    return (
      <Box>
        <RadioGroup name="roleStatus" row required onChange={handleChange}>
          <FormControlLabel
            control={<Radio />}
            value={STATUS.ACTIVE}
            label="Active"
            checked={values.roleStatus === STATUS.ACTIVE}
          />
          <FormControlLabel
            control={<Radio />}
            value={STATUS.PENDING}
            label="Pending"
            checked={values.roleStatus === STATUS.PENDING}
          />
          <FormControlLabel
            control={<Radio />}
            value={STATUS.RETIRED}
            label="Retired"
            checked={values.roleStatus === STATUS.RETIRED}
          />
        </RadioGroup>
        <FormHelperText error={touched.roleStatus && errors.roleStatus}>
          {touched.roleStatus && errors.roleStatus ? errors.roleStatus : ''}
        </FormHelperText>
      </Box>
    )
  }

  return (
    <Slide direction="right" in={enter}>
      <Box>
        <Formik
          enableReinitialize
          initialValues={{ ...roleFormContext.roleFormValues }}
          validationSchema={CreateEditRoleFormSchema}
          onSubmit={(values) => {
            console.log('handleNext: ', roleFormContext.roleFormValues)
            roleFormContext.setRoleFormValues(values)
            handleNext()
            console.log(roleFormContext)
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <Box mb={1.5}>
                    <FormLabel>Role Name</FormLabel>
                  </Box>
                  {renderRoleNameField(touched, errors)}
                </Grid>
                <Grid item sm={12}>
                  <Box mb={1.5}>
                    <FormLabel>Role Description</FormLabel>
                  </Box>
                  {renderDescriptionField(touched, errors)}
                </Grid>
                <Grid item sm={12}>
                  <Box mb={isLoading ? 1.5 : 0}>
                    <FormLabel>Role Status</FormLabel>
                  </Box>
                  {renderStatusRadioGroup(
                    values,
                    errors,
                    touched,
                    handleChange
                  )}
                </Grid>
                <Grid item sm={12}>
                  <Box my={5}>
                    <BackNextButtons
                      handleBackClick={handleBack}
                      handleNextClick={handleSubmit}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Slide>
  )
}

export default CreateEditRoleForm

CreateEditRoleForm.propTypes = {
  handleNext: propTypes.func,
  handleBack: propTypes.func,
  enter: propTypes.bool,
  isLoading: propTypes.bool,
}

CreateEditRoleForm.defaultProps = {
  enter: false,
  isLoading: false,
}
