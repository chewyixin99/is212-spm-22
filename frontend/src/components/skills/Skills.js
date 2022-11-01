import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { Alert, Box, Breadcrumbs, Stack, Typography } from '@mui/material'

import { ENDPOINT, STATUS } from '../../constants'
import DescriptionRow from '../common/DescriptionRow'
import StyledBreadcrumb from '../common/StyledBreadcrumb'
import EditButtons from '../common/EditButtons'
import ConfirmationDialog from '../common/ConfirmationDialog'
import useDialogState from '../../services/common/useDialogState'

function Skill() {
  const navigate = useNavigate()
  const { skill_id } = useParams()
  const baseUrl = ENDPOINT
  const [skill, setSkill] = useState([])
  const [skillCourses, setSkillCourses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const deleteDialogState = useDialogState()

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseUrl}/skills/${skill_id}`)
        .then((results) => results.json())
        .then((data) => {
          setSkill(data.data)
        })
      await fetch(`${baseUrl}/skills/${skill_id}/courses`)
        .then((results) => results.json())
        .then((data) => {
          setSkillCourses(data.data.courses)
        })
    }
    fetchData().catch(console.error)
  }, [])

  const renderAlertMessage = (status) => {
    if (status === STATUS.RETIRED) {
      return (
        <Alert severity="error">
          This skill is no longer available for learning.
        </Alert>
      )
    } else if (status === STATUS.PENDING) {
      return <Alert severity="warning">This skill is pending approval.</Alert>
    }
    return (
      <Alert severity="info">
        This skill is currently available for learning.
      </Alert>
    )
  }

  // filter for breadcrumbs
  const checkActive = (course) => {
    return course.course_status === STATUS.ACTIVE
  }

  const renderSkillCourses = () => {
    if (skillCourses.filter(checkActive).length > 0) {
      return (
        <Stack>
          <Typography
            sx={{ color: 'text.secondary' }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Courses under skill
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            {skillCourses.filter(checkActive).map((course) => (
              <StyledBreadcrumb>
                {/* to add link to the course page */}
                {course.course_id}: {course.course_name}
              </StyledBreadcrumb>
            ))}
          </Breadcrumbs>
        </Stack>
      )
    } else {
      return (
        <Typography
          sx={{ color: 'text.secondary' }}
          variant="subtitle1"
          display="block"
          gutterBottom
        >
          There are no active courses that has this skill yet.
        </Typography>
      )
    }
  }

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleEditClick = () => {
    navigate(`/admin/skills/${skill.skill_id}/edit`, {
      state: {
        skillState: {
          skillName: skill.skill_name,
          skillId: skill.skill_id,
          skillDesc: skill.skill_desc,
          skillStatus: skill.status,
        },
        from: 'Skills',
      },
    })
  }

  const handleConfirmDeleteClick = () => {
    setIsLoading(true)
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const url = `${ENDPOINT}/skills/${skill_id}`
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        setIsLoading(false)
        if (responseJSON.code > 399) {
          enqueueSnackbar(responseJSON.message, { variant: 'error' })
        } else {
          enqueueSnackbar('Skill successfully deleted.', { variant: 'success' })
          navigate('/admin/skills', {
            replace: true,
          })
        }
      })
      .catch(() => {
        setIsLoading(false)
        deleteDialogState.close()
        enqueueSnackbar('Internal server error, please try again.', {
          variant: 'error',
        })
      })
  }

  return (
    <Box sx={{ width: '50%', margin: 'auto' }}>
      <Typography
        variant="h3"
        noWrap
        component="a"
        sx={{
          mr: 2,
          my: 3,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      />
      <Box sx={{ marginBottom: '10vh', justifyContent: 'center' }}>
        <Typography variant="h4" component="div" gutterBottom>
          {skill.skill_name}
        </Typography>
        <Stack spacing={4} sx={{ marginTop: '5vh', marginBottom: '10vh ' }}>
          {renderAlertMessage(skill.status)}
          {renderSkillCourses()}
          <DescriptionRow title="Skill ID" value={skill.skill_id?.toString()} />
          <DescriptionRow title="Skill Desciption" value={skill.skill_desc} />
          <DescriptionRow title="Skill Status" value={skill.status} />
          <EditButtons
            handleBackClick={handleBackClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={deleteDialogState.open}
          />
        </Stack>
      </Box>
      <ConfirmationDialog
        dialogTitle="Delete skill?"
        dialogBody='Once you delete this skill, you will not be able to recover it.
        Consider want to setting status to "Retired" instead.'
        isOpen={deleteDialogState.isOpen}
        closeCallback={deleteDialogState.open}
        backCallback={deleteDialogState.close}
        proceedCallback={handleConfirmDeleteClick}
        proceedButtonTitle="Delete"
        proceedColor="error"
        isLoading={isLoading}
      />
    </Box>
  )
}

export default Skill
