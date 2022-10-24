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
} from '@mui/material'

import { STATUS } from '../../constants'
import createRoleFormSchema from '../../schemas/createRoleFormSchema'
import CreateRoleFormContext from '../../contexts/roles/CreateRoleFormContext'
import BackNextButtons from '../common/BackNextButtons'

const CreateRoleForm = ({ handleNext, handleBack }) => {
  const roleFormContext = useContext(CreateRoleFormContext)

  return (
    <Formik
      initialValues={{ ...roleFormContext.roleFormValues }}
      validationSchema={createRoleFormSchema}
      onSubmit={(values) => {
        roleFormContext.setRoleFormValues(values)
        handleNext()
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Box mb={1.5}>
                <FormLabel>Role Name</FormLabel>
              </Box>
              <Field
                as={TextField}
                fullWidth
                name="roleName"
                label="Enter role name"
                error={touched.roleName && errors.roleName}
                helperText={
                  touched.roleName && errors.roleName ? errors.roleName : ''
                }
              />
            </Grid>
            <Grid item sm={12}>
              <Box mb={1.5}>
                <FormLabel>Role Description</FormLabel>
              </Box>
              <Field
                as={TextField}
                fullWidth
                multiline
                rows={4}
                error={touched.roleDesc && errors.roleDesc}
                helperText={
                  touched.roleDesc && errors.roleDesc ? errors.roleDesc : ''
                }
                name="roleDesc"
                label="Enter role description"
              />
            </Grid>
            <Grid item sm={12}>
              <FormLabel>Role Status</FormLabel>
              <RadioGroup
                name="roleStatus"
                row
                required
                onChange={handleChange}
              >
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
                {touched.roleStatus && errors.roleStatus
                  ? errors.roleStatus
                  : ''}
              </FormHelperText>
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
  )
}

export default CreateRoleForm

CreateRoleForm.propTypes = {
  handleNext: propTypes.func,
  handleBack: propTypes.func,
}
