import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { Box, Stepper, Step, StepLabel } from '@mui/material'

import CreateEditRoleFormContext from '../../contexts/roles/createEditRoleFormContext'
import CreateEditRoleForm from './CreateEditRoleForm'
import CreateEditRoleFormPreview from './CreateEditRoleFormPreview'

export default function CreateEditRoleStepper({
  edit,
  rolesInitialData,
  skillsInitialData,
  allSkillsData,
  rolesLoading,
  skillsLoading,
  allSkillsLoading,
}) {
  const [isLoading, setIsLoading] = useState(
    rolesLoading || skillsLoading || allSkillsLoading
  )
  const [activeStep, setActiveStep] = useState(0)
  const [roleFormValues, setRoleFormValues] = useState({
    roleName: '',
    roleDesc: '',
    roleDept: '',
    roleStatus: '',
    skills: [],
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
    if (edit && !rolesLoading && !skillsLoading && !allSkillsLoading) {
      // error here when failed roles/skills loading modal
      const {
        role_id: roleId,
        role_name: roleName,
        role_desc: roleDesc,
        role_dept: roleDept,
        status: roleStatus,
      } = rolesInitialData[0]
      setRoleFormValues({
        roleId,
        roleName,
        roleDesc,
        roleDept,
        roleStatus,
        skills: skillsInitialData.map((skill) => skill.skill_id),
      })
      setIsLoading(false)
    }
  }, [rolesInitialData, skillsInitialData])

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
          allSkillsData={allSkillsData}
          handleNext={handleNext}
          handleBack={handleBack}
          enter={activeStep === 0}
          isLoading={isLoading}
        />
      )
    }
    return (
      <CreateEditRoleFormPreview
        allSkillsData={allSkillsData}
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
  rolesInitialData: propTypes.object,
  skillsInitialData: propTypes.object,
  allSkillsData: propTypes.array,
  edit: propTypes.bool,
  rolesLoading: propTypes.bool,
  skillsLoading: propTypes.bool,
  allSkillsLoading: propTypes.bool,
}

CreateEditRoleStepper.defaultProps = {
  edit: false,
  rolesLoading: false,
  skillsLoading: false,
  allSkillsLoading: false,
}
