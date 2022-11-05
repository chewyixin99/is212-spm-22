import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Stepper, Step, StepLabel } from '@mui/material'

import CreateRoleFormContext from '../../contexts/roles/CreateRoleFormContext'
import CreateRoleForm from './CreateRoleForm'
import CreateRoleFormPreview from './CreateRoleFormPreview'

const steps = ['Fill', 'Preview']

export default function CreateRoleStepper() {
  const [activeStep, setActiveStep] = useState(0)
  const [roleFormValues, setRoleFormValues] = useState({
    roleName: '',
    roleDesc: '',
    roleStatus: '',
  })
  const navigate = useNavigate()

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
      return <CreateRoleForm handleNext={handleNext} handleBack={handleBack} />
    }
    return <CreateRoleFormPreview handleBack={handleBack} />
  }

  return (
    <CreateRoleFormContext.Provider
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
    </CreateRoleFormContext.Provider>
  )
}
