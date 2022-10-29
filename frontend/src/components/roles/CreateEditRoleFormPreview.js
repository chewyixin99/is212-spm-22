import React, { useContext, useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { Box, Grid, Slide } from '@mui/material'

import CreateEditRoleFormContext from '../../contexts/roles/createEditRoleFormContext'
import BackNextButtons from '../common/BackNextButtons'
import DescriptionRow from '../common/DescriptionRow'
import createRoleService from '../../services/roles/createRoleService'
import editRoleService from '../../services/roles/editRoleService'

const CreateEditRoleFormPreview = ({
  allSkillsData,
  handleBack,
  enter,
  edit,
}) => {
  const roleFormContext = useContext(CreateEditRoleFormContext)
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const processPreviewSkills = (selectedSkills) => {
    const skillNames = []
    selectedSkills.map((selectedSkillId) => {
      const selectedSkillData = allSkillsData.filter(
        (skill) => skill.skill_id === selectedSkillId
      )[0]
      skillNames.push(selectedSkillData?.skill_name)
    })
    return skillNames.join(', ')
  }

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
          <DescriptionRow
            title="Role Name"
            value={roleFormContext.roleFormValues.roleName}
          />
        </Grid>
        <Grid item sm={12}>
          <DescriptionRow
            title="Role Description"
            value={roleFormContext.roleFormValues.roleDesc}
          />
        </Grid>
        <Grid item sm={12}>
          <DescriptionRow
            title="Role Department"
            value={roleFormContext.roleFormValues.roleDept}
          />
        </Grid>
        <Grid item sm={12}>
          <DescriptionRow
            title="Relevant Skills"
            value={processPreviewSkills(roleFormContext.roleFormValues.skills)}
          />
        </Grid>
        <Grid item sm={12}>
          <DescriptionRow
            title="Role Status"
            value={roleFormContext.roleFormValues.roleStatus}
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
  allSkillsData: propTypes.object,
  handleBack: propTypes.func,
  enter: propTypes.bool,
  edit: propTypes.bool,
}

CreateEditRoleFormPreview.defaultProps = {
  enter: false,
  edit: false,
}
