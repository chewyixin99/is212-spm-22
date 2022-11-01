import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import {
  Box,
  FormLabel,
  FormControlLabel,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  FormHelperText,
} from '@mui/material'

import SectionHeader from '../../components/common/SectionHeader'
import DescriptionRow from '../../components/common/DescriptionRow'
import BackNextButtons from '../../components/common/BackNextButtons'
import { STATUS, ENDPOINT } from '../../constants'

function AdminEditSkill() {
  const location = useLocation()
  const navigate = useNavigate()
  const { skillState } = location.state

  const [allCourses, setAllCourses] = useState([])

  const { skillName, skillId, skillDesc, skillStatus } = skillState
  const [isLoading, setIsLoading] = useState(false)

  const [newSkillDesc, setNewSkillDesc] = useState(skillDesc)
  const [skillDescError, setSkillDescError] = useState(false)
  const [newSkillStatus, setNewSkillStatus] = useState(skillStatus)
  const [newCourses, setNewCourses] = useState([])
  const [removeCourses, setRemoveCourses] = useState([])
  const [coursesError, setCoursesError] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  // get skill courses from db first load
  useEffect(() => {
    const fetchData = async () => {
      // all courses
      await fetch(`${ENDPOINT}/courses`)
        .then((response) => response.json())
        .then((responseJSON) => {
          setAllCourses(responseJSON.data.courses)
        })
      // courses
      await fetch(`${ENDPOINT}/skills/${skillId}/courses`)
        .then((response) => response.json())
        .then((responseJSON) => {
          const newCoursesName = responseJSON.data.courses.map(
            (course) => course.course_id
          )
          setRemoveCourses(newCoursesName)
          setNewCourses(newCoursesName)
        })
    }
    fetchData().catch((err) => {
      console.log(err)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)
    setSkillDescError(false)
    setCoursesError(false)

    if (newSkillDesc === '' || newSkillDesc.length > 255) {
      setSkillDescError(true)
    }

    if (newCourses === [] || newCourses.length < 1) {
      setCoursesError(true)
    }

    if (!(newSkillDesc.length > 255 || newCourses.length < 1)) {
      // handle submit
      const requestBody = {
        status: newSkillStatus,
        skill_desc: newSkillDesc,
        add: newCourses,
        remove: removeCourses,
      }
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
      const url = `${ENDPOINT}/skills/${skillId}`

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
          setIsLoading(false)

          if (responseJSON.code > 399) {
            enqueueSnackbar(responseJSON.message, { variant: 'error' })
          } else {
            enqueueSnackbar(`Skill ${skillName} successfully updated.`, {
              variant: 'success',
            })
            navigate(`/admin/skills/${skillId}`)
          }
        })
        .catch(() => {
          enqueueSnackbar('Internal server error, please try again.', {
            variant: 'error',
          })
        })
    } else {
      setIsLoading(false)
    }
  }

  const handleCancelClick = () => {
    navigate(-1)
  }

  const handleCoursesChange = (e) => {
    const {
      target: { value },
    } = e
    setNewCourses(typeof value === 'string' ? newCourses.split(',') : value)
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
        <SectionHeader header="Edit skill" />
        <form onSubmit={handleSubmit}>
          <DescriptionRow title="Skill ID" value={skillId} />
          <DescriptionRow title="Skill Name" value={skillName} />
          <Box sx={{ mb: 1 }}>
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
              helperText={`Not more than 255 characters (${newSkillDesc.length}/255)`}
              margin="normal"
              sx={{ marginBottom: 2 }}
              required
              error={skillDescError}
              name="skillDesc"
              onChange={(e) => {
                setNewSkillDesc(e.target.value)
              }}
              fullWidth
              value={newSkillDesc}
            />
          </Box>

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
              value={newCourses}
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
              {allCourses.map((singleCourse) => {
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

          <FormLabel id="skill-status-label">Status</FormLabel>
          <RadioGroup
            row
            aria-labelledby="skill-status-label"
            name="skillStatus"
            required
            value={newSkillStatus}
            onChange={(e) => {
              setNewSkillStatus(e.target.value)
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
          <Box my={3}>
            <BackNextButtons
              handleBackClick={handleCancelClick}
              handleNextClick={handleSubmit}
              isLoading={isLoading}
              backButtonLabel="Cancel"
            />
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AdminEditSkill
