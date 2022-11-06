import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  Chip,
} from '@mui/material'

import SectionHeader from '../../components/common/SectionHeader'
import BackNextButtons from '../../components/common/BackNextButtons'
import { STATUS, ENDPOINT } from '../../constants'
import SnackbarAlert from '../../components/common/SnackbarAlert'
import isValidSkillDetails, {
  isValidSkillCourses,
  isValidSkillDesc,
  isValidSkillName,
} from './adminSkillsLib'

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
      alertSeverity !== 'error' &&
      isValidSkillName(formValues.skillName) &&
      isValidSkillDetails(formValues.skillDesc, courses)
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

  const checkActiveCourse = (course) => {
    return course.course_status === STATUS.ACTIVE
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
    if (isValidSkillName(formValues.skillName)) {
      checkSkillName()
    } else {
      setIsLoading(false)
    }

    if (!isValidSkillName(formValues.skillName)) {
      setSkillNameError(true)
    }

    if (!isValidSkillDesc(formValues.skillDesc)) {
      setSkillDescError(true)
    }

    if (!isValidSkillCourses(courses)) {
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
            Skill Name
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
            Skill Description
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
            <InputLabel>Select course</InputLabel>
            <Select
              value={courses}
              name="courses"
              label="Select course"
              multiple
              onChange={(e) => {
                handleCoursesChange(e)
              }}
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
              {allCourses.filter(checkActiveCourse).map((singleCourse) => {
                return (
                  <MenuItem
                    value={singleCourse.course_id}
                    key={singleCourse.course_id}
                  >
                    {singleCourse.course_id}: {singleCourse.course_name}
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
          <Box my={3}>
            <BackNextButtons
              handleBackClick={handleBackClick}
              handleNextClick={handleSubmit}
              isLoading={isLoading}
            />
          </Box>
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
