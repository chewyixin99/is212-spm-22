import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { Box, Stepper, Step, StepLabel } from '@mui/material'

import CreateEditRoleFormContext from '../../contexts/roles/createEditRoleFormContext'
import CreateEditRoleForm from './CreateEditRoleForm'
import CreateEditRoleFormPreview from './CreateEditRoleFormPreview'

export default function CreateEditRoleStepper({
  edit,
  initialData,
  isLoading,
}) {
  const [activeStep, setActiveStep] = useState(0)
  const [roleFormValues, setRoleFormValues] = useState({
    roleName: '',
    roleDesc: '',
    roleStatus: '',
  })
  const navigate = useNavigate()
  const steps = []

  if (edit) {
    steps.push('Edit', 'Preview')
  } else {
    steps.push('Fill', 'Preview')
  }

  useEffect(() => {
    // Initialise form values (if edit)
    if (edit && !isLoading) {
      const {
        role_id: roleId,
        role_name: roleName,
        role_desc: roleDesc,
        status: roleStatus,
      } = initialData[0]
      setRoleFormValues({
        roleId,
        roleName,
        roleDesc,
        roleStatus,
      })
    }
  }, [initialData])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    if (activeStep === 0) {
      navigate(-1)
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const renderStepperContent = () => {
    if (activeStep === 0) {
      return (
        <CreateEditRoleForm
          handleNext={handleNext}
          handleBack={handleBack}
          enter={activeStep === 0}
          isLoading={isLoading}
        />
      )
    }
    return (
      <CreateEditRoleFormPreview
        handleBack={handleBack}
        enter={activeStep === 1}
        edit={edit}
      />
    )
  }

  return (
    <CreateEditRoleFormContext.Provider
      value={{ roleFormValues, setRoleFormValues }}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ my: 5 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </Box>
        {renderStepperContent()}
      </Box>
    </CreateEditRoleFormContext.Provider>
  )
}

CreateEditRoleStepper.propTypes = {
  initialData: propTypes.object,
  edit: propTypes.bool,
  isLoading: propTypes.bool,
}

CreateEditRoleStepper.propTypes = {
  edit: false,
  isLoading: false,
}
