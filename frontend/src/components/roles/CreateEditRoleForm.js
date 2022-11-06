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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from '@mui/material'

import { STATUS, ROLEDEPT } from '../../constants'
import CreateEditRoleFormSchema from '../../schemas/createEditRoleFormSchema'
import CreateEditRoleFormContext from '../../contexts/roles/createEditRoleFormContext'
import BackNextButtons from '../common/BackNextButtons'

const CreateEditRoleForm = ({
  allSkillsData,
  handleNext,
  handleBack,
  enter,
  isLoading,
}) => {
  const roleFormContext = useContext(CreateEditRoleFormContext)
  // console.log('---> CreateEditRoleForm, roleFormContext: ', roleFormContext)

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

  const renderRoleDeptField = (values, touched, errors, handleChange) => {
    const selectRoleDeptLabel = 'Select role'

    if (isLoading) {
      return <Skeleton variant="rounded" />
    }
    return (
      <FormControl fullWidth error={touched.roleDept && errors.roleDept}>
        <InputLabel>{selectRoleDeptLabel}</InputLabel>
        <Select
          variant="outlined"
          value={values.roleDept}
          fullWidth
          name="roleDept"
          onChange={handleChange}
          label={selectRoleDeptLabel}
        >
          {ROLEDEPT.map((role, idx) => (
            <MenuItem key={idx} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={touched.roleDept && errors.roleDept}>
          {touched.roleDept && errors.roleDept ? errors.roleDept : ''}
        </FormHelperText>
      </FormControl>
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

  const renderSkillsField = (values, touched, errors, handleChange) => {
    const skillsSelectLabel = 'Select relevant skill'
    const renderSelectChip = (selectedSkills) => {
      const chips = []
      selectedSkills.map((selectedSkillId) => {
        const selectedSkillData = allSkillsData.filter(
          (skill) => skill.skill_id === selectedSkillId
        )[0]
        chips.push(
          <Chip
            key={selectedSkillData?.skill_id}
            label={selectedSkillData?.skill_name}
            sx={{ mr: 0.5 }}
          />
        )
      })
      return chips
    }

    if (isLoading) {
      return <Skeleton variant="rounded" />
    }
    return (
      <FormControl fullWidth error={touched.skills && errors.skills}>
        <InputLabel>{skillsSelectLabel}</InputLabel>
        <Select
          variant="outlined"
          multiple
          value={values.skills}
          fullWidth
          name="skills"
          onChange={handleChange}
          label={skillsSelectLabel}
          renderValue={renderSelectChip}
        >
          {allSkillsData.map((skill) => (
            <MenuItem key={skill.skill_id} value={skill.skill_id}>
              {skill.skill_name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={touched.skills && errors.skills}>
          {touched.skills && errors.skills ? errors.skills : ''}
        </FormHelperText>
      </FormControl>
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
                  {renderRoleNameField(touched, errors)}
                </Grid>
                <Grid item sm={12}>
                  <Box mb={1.5}>
                    <FormLabel>Role Description</FormLabel>
                  </Box>
                  {renderDescriptionField(touched, errors)}
                </Grid>
                <Grid item sm={12}>
                  <Box mb={1.5}>
                    <FormLabel>Role Department</FormLabel>
                  </Box>
                  {renderRoleDeptField(values, touched, errors, handleChange)}
                </Grid>
                <Grid item sm={12}>
                  <Box mb={1.5}>
                    <FormLabel>Relevant Skills</FormLabel>
                  </Box>
                  {renderSkillsField(values, touched, errors, handleChange)}
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
  allSkillsData: propTypes.array,
  handleNext: propTypes.func,
  handleBack: propTypes.func,
  enter: propTypes.bool,
  isLoading: propTypes.bool,
}

CreateEditRoleForm.defaultProps = {
  enter: false,
  isLoading: false,
}
