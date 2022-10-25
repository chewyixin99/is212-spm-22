import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import { ENDPOINT, STATUS } from '../../constants'
import DescriptionRows from '../common/DescriptionRows'
import SnackbarAlert from '../common/SnackbarAlert'
import StyledBreadcrumb from '../common/StyledBreadcrumb'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

function Skill() {
  const navigate = useNavigate()
  const location = useLocation()

  const { skill_id } = useParams()
  const baseUrl = ENDPOINT
  const [skill, setSkill] = useState([])
  const [skillCourses, setSkillCourses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('Skill successfully edited')
  const [alertSeverity, setAlertSeverity] = useState('success')
  // modal controls
  const [openModal, setOpenModal] = useState(false)

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

  const renderSkillCourses = (skillCourses) => {
    if (skillCourses.filter(checkActive).length > 0) {
      return (
        <Stack>
          <Typography sx={{ color: 'text.secondary' }} variant="subtitle1" display="block" gutterBottom>
            Courses under skill
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            {skillCourses.filter(checkActive).map((course) => (
              <StyledBreadcrumb>
                {/* to add link to the course page */}
                {course.course_name}
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
    console.log(`edit clicked`)
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

  const handleDeleteClick = () => {
    console.log(`delete clicked`)
    setOpenModal(true)
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
          setAlertMessage(responseJSON.message)
          setAlertSeverity('error')
          setSnackbarOpen(true)
        } else {
          navigate('/admin/skills', {
            replace: true,
          })
        }
      })
      .catch(() => {
        setIsLoading(false)
        setAlertMessage('Internal server error, please try again.')
        setAlertSeverity('error')
        setSnackbarOpen(true)
        setOpenModal(false)
      })
  }

  const handleModalClose = () => {
    setOpenModal(false)
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
          {renderSkillCourses(skillCourses)}
          {DescriptionRows('Skill ID', skill.skill_id)}
          {DescriptionRows('Skill description', skill.skill_desc)}
          {DescriptionRows('Skill status', skill.status)}
          <form>
            <Button
              variant="outlined"
              sx={{ mr: 3 }}
              startIcon={<KeyboardArrowLeft />}
              onClick={handleBackClick}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{ mr: 3 }}
              onClick={handleEditClick}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mr: 3 }}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </form>
        </Stack>
      </Box>
      <SnackbarAlert
        open={snackbarOpen}
        alertMessage={alertMessage}
        alertSeverity={alertSeverity}
      ></SnackbarAlert>
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>{'Delete skill?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once you delete this skill, you will not be able to recover it.
            Consider want to setting status to "Retired" instead.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} autoFocus>
            Back
          </Button>
          <LoadingButton
            variant="contained"
            loading={isLoading}
            color="error"
            onClick={handleConfirmDeleteClick}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Skill
