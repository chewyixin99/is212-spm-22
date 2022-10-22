import React, { useEffect, useState } from 'react'
import {
  Box,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  Chip,
  OutlinedInput,
} from '@mui/material'

import SectionHeader from '../../components/common/SectionHeader'
import { STATUS } from '../../constants'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../../constants'
import SnackbarAlert from '../../components/common/SnackbarAlert'
import { LoadingButton } from '@mui/lab'

function AdminNewSkill() {
  // error handling already built in TextField
  const navigate = useNavigate()
  const [allCourses, setAllCourses] = useState([])
  const [courses, setCourses] = useState([])

  const [skillNameError, setSkillNameError] = useState(false)
  const [skillDescError, setSkillDescError] = useState(false)
  const [coursesError, setCoursesError] = useState(false)
  const [formValues, setFormValues] = useState({
    skillName: '',
    skillDesc: '',
    skillStatus: STATUS.ACTIVE,
  })

  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('Default alert message')
  const [alertSeverity, setAlertSeverity] = useState('error')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${ENDPOINT}/courses`)
        .then((response) => response.json())
        .then((responseJSON) => {
          setAllCourses(responseJSON.data.courses)
        })
    }
    fetchData().catch(console.error)
  }, [])

  useEffect(() => {
    if (
      !(
        alertSeverity === 'error' ||
        formValues.skillName.length > 50 ||
        formValues.skillDesc.length > 255 ||
        courses.length < 1
      )
    ) {
      navigate('/admin/newskill/preview', {
        state: {
          formValues: formValues,
          courses: courses,
        },
      })
    }
  }, [alertSeverity])

  const checkSkillName = async () => {
    await fetch(`${ENDPOINT}/skills/${formValues.skillName}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON.code < 299) {
          setSkillNameError(true)
          setSnackbarOpen(true)
          setAlertMessage(
            `Skill ${formValues.skillName} already exists, unable to create skill`
          )
        } else if (responseJSON.code > 499) {
          setSnackbarOpen(true)
          setAlertMessage('Internal server error, please try again')
        } else {
          setAlertSeverity('success')
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setSnackbarOpen(true)
        setAlertMessage('Internal server error, please try again')
        console.log(err)
        setIsLoading(false)
      })
  }

  const handleBackClick = () => {
    navigate(-1)
  }

  const updateFormValues = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleCoursesChange = (e) => {
    const {
      target: { value },
    } = e
    setCourses(typeof value === 'string' ? courses.split(',') : value)
  }

  const handleSubmit = (e) => {
    // prevent refreshing of page, without this will have warning
    // 'Form submission canceled because the form is not connected'
    e.preventDefault()

    setAlertSeverity('error')
    setSkillNameError(false)
    setSkillDescError(false)
    setCoursesError(false)
    setSnackbarOpen(false)
    setIsLoading(true)

    // check if skill is already present
    checkSkillName()

    if (formValues.skillName == '' || formValues.skillName.length > 50) {
      setSkillNameError(true)
    }

    if (formValues.skillDesc == '' || formValues.skillDesc.length > 255) {
      setSkillDescError(true)
    }

    if (courses.length < 1) {
      setCoursesError(true)
    }
  }

  return (
    <Box sx={{ my: 5 }}>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up('md')]: {
            width: '50%',
          },
          width: '80%',
          margin: 'auto',
        })}
      >
        <SectionHeader header="Create new skill" />
        {/* id, name, status, description */}
        <form onSubmit={handleSubmit}>
          <Typography
            sx={{ color: 'text.secondary' }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Skill name
          </Typography>
          <TextField
            id="skill-name"
            label="Enter skill name"
            helperText={`e.g., Python, Agile, etc. Not more than 50 characters (${formValues.skillName.length}/50)`}
            // margin="normal"
            sx={{ marginBottom: 3 }}
            required
            error={skillNameError}
            name="skillName"
            onChange={(e) => {
              updateFormValues(e)
            }}
            fullWidth
          />
          <Typography
            sx={{ color: 'text.secondary' }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Skill description
          </Typography>
          <TextField
            id="skill-desc"
            label="Enter skill description"
            multiline
            rows={4}
            helperText={`Not more than 255 characters (${formValues.skillDesc.length}/255)`}
            // margin="normal"
            sx={{ marginBottom: 3 }}
            required
            error={skillDescError}
            name="skillDesc"
            onChange={(e) => {
              updateFormValues(e)
            }}
            fullWidth
          />
          {/* Add dropdown for courses here */}
          <Typography
            sx={{ color: 'text.secondary' }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Courses
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 3 }} error={coursesError}>
            <InputLabel id="courses">Select course</InputLabel>
            <Select
              labelId="courses"
              id="courses-select"
              value={courses}
              name="courses"
              label="Course"
              multiple
              onChange={(e) => {
                handleCoursesChange(e)
              }}
              input={<OutlinedInput label="Chip" />}
              renderValue={(selectedCourse) => {
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedCourse.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )
              }}
            >
              {allCourses.map((singleCourse) => {
                return (
                  <MenuItem
                    value={singleCourse.course_id}
                    key={singleCourse.course_id}
                  >
                    {singleCourse.course_id}
                  </MenuItem>
                )
              })}
            </Select>
            <FormHelperText>Select at least one course</FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel id="skill-status-label">Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="skill-status-label"
              name="skillStatus"
              multiple
              required
              value={formValues.skillStatus}
              onChange={(e) => {
                updateFormValues(e)
              }}
            >
              <FormControlLabel
                value={STATUS.ACTIVE}
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value={STATUS.PENDING}
                control={<Radio />}
                label="Pending"
              />
              <FormControlLabel
                value={STATUS.RETIRED}
                control={<Radio />}
                label="Retired"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="outlined"
            sx={{ my: 3, mr: 3 }}
            startIcon={<KeyboardArrowLeft />}
            onClick={handleBackClick}
          >
            Back
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ my: 3 }}
            loading={isLoading}
            loadingPosition="end"
            endIcon={<KeyboardArrowRight />}
          >
            Next
          </LoadingButton>
        </form>
        <SnackbarAlert
          open={snackbarOpen}
          alertMessage={alertMessage}
          alertSeverity={alertSeverity}
        />
      </Box>
    </Box>
  )
}

export default AdminNewSkill
