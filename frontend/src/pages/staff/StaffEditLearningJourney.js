import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RESPONSE_CODES, ENDPOINT } from '../../constants'

import SectionHeader from '../../components/common/SectionHeader'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'

import CardHeader from '@mui/material/CardHeader'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'

import axios from 'axios'
import CoursesBySkillEdit from '../../components/learningJourney/CoursesBySkillEdit'

const steps = ['Update Learning Journey', 'Review Learning Journey']

const StaffEditLearningJourney = () => {
  const { id } = useParams()
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set())
  const [skillData, setSkillData] = React.useState([])
  const [selectedSkill, setSelectedSkill] = React.useState('')
  const [selectedRoleId, setSelectedRoleId] = React.useState(0)
  const [selectedRoleName, setSelectedRoleName] = React.useState('N.A.')

  const [learningJourneyName, setLearningJourneyName] = React.useState('')
  const [learningJourneyId, setLearningJourneyId] = React.useState('')

  const [selectedCourses, setSelectedCourses] = React.useState({})
  const [selectedEditCourses, setSelectedEditCourses] = React.useState({})
  const [selectedCourseIds, setSelectedCourseIds] = React.useState([])
  const [isCourseSelected, setIsCourseSelected] = React.useState(false)

  const [isLoaded, setIsLoaded] = React.useState(false)

  const [updateFlag, setUpdateFlag] = React.useState(false)

  const isStepOptional = (step) => {
    return false
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }
    if (activeStep === 0) {
      if (learningJourneyName === '') {
        alert('Please enter a learning journey name.')
        return
      } 
      else if (!isCourseSelected) {
        alert('Please select at least one course.')
        return
      }
      else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
      }
    }
    if (activeStep === 1) {
      // submit learning journey
        editLearningJourney()
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/staff/learning-journey')
  }

  const handleAddCourses = (coursesArr, name) => {
    setSelectedEditCourses((selectedCourses) => ({
      ...selectedCourses,
      [name]: coursesArr,
    }))
  }

  const filterNewOld = (new_names) => {
    const add = new_names
      .filter((course) => {
        return !selectedCourses.includes(course)
      })
      .map((course) => {
        return course
      })

    const remove = selectedCourses
      .filter((course) => {
        return !new_names.includes(course)
      })
      .map((course) => {
        return course
      })

    return [add, remove]
  }

  const convertNameToIds = (course_names) => {
    return axios.get(`${ENDPOINT}/courses`).then((response) => {
      return response.data.data.courses
        .filter((course) => {
          return course_names.includes(course.course_name)
        })
        .map((course) => {
          return course.course_id
        })

      // setSelectedCourseIds(test);
    })
  }

  const editLearningJourney = async () => {
    // submit learning journey

    const course_names = Object.values(selectedEditCourses).flat()
    const add = filterNewOld(course_names)[0]
    const remove = filterNewOld(course_names)[1]
    const body = {
      learning_journey_name: learningJourneyName,
      add: await convertNameToIds(add),
      remove: await convertNameToIds(remove),
    }

    axios
      .put(`${ENDPOINT}/learning_journeys/${learningJourneyId}/update`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // stepper form functions end ------------------------

  // select skill functions start ------------------------

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value)
  }
  // select skill functions start ------------------------

  const handleUpdateCourses = () => {
    let flag = false

    Object.keys(selectedEditCourses).forEach(function (k) {
      if (selectedEditCourses[k].length > 0) {
        flag = true
      }
    })

    if (flag) {
      setIsCourseSelected(true)
    } else {
      setIsCourseSelected(false)
    }
  }

  const handleUpdate = () => {
    setUpdateFlag(!updateFlag)
  }

  const getData = async (id) => {
    await fetch(`${ENDPOINT}/learning_journeys/${id}`)
      .then((results) => results.json())
      .then((data) => {
        setLearningJourneyName(data.data.learning_journey.learning_journey_name)
        setLearningJourneyId(data.data.learning_journey.learning_journey_id)
        setSelectedCourseIds(
          data.data.courses.map((course) => {
            return course.course_id
          })
        )
        setSelectedCourses(
          data.data.courses.map((course) => {
            return course.course_name
          })
        )
        setIsLoaded(true)
        return data.data.learning_journey.role_id
      })
      .then(async (role_id) => {
        await fetch(`${ENDPOINT}/roles/${role_id}/skills`)
          .then((results) => results.json())
          .then((data) => {
            // console.log(data.data);
            setSkillData(data.data.skills)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }


  useEffect(() => {
    handleUpdateCourses()
  }, [selectedEditCourses])

  useEffect(() => {
    getData(id)
  }, [isLoaded])

  return (
    <Box sx={{ width: '50%', margin: 'auto', padding: '40px 0' }}>
      <h1>Edit Learning Journey</h1>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            )
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box
            sx={{
              height: '50vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              You have successfully updated{' '}
              {learningJourneyName !== ''
                ? learningJourneyName
                : 'a new Learning Journey'}
              !
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleRedirect}>Redirect</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ minHeight: '60vh', padding: '1rem' }}>
            <Typography sx={{ mt: 2, mb: 3 }}>Step {activeStep + 1}</Typography>
            {(() => {
              switch (activeStep) {
                // step 1 represents the learning journey name input and role selection
                case 0:
                  return (
                    <Box sx={{}}>
                      <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                          Learning Journey Name
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              id="learningJourneyName"
                              name="learningJourneyName"
                              fullWidth
                              variant="standard"
                              onChange={(e) =>
                                setLearningJourneyName(e.target.value)
                              }
                              value={learningJourneyName}
                            />
                          </Grid>
                        </Grid>
                      </React.Fragment>
                      <React.Fragment>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontSize: '1rem' }}
                        >
                          Minimum 1 course selected.
                        </Typography>
                        {skillData?.map((item) => {
                          return (
                            <CoursesBySkillEdit
                              item={item}
                              key={item.skill_id}
                              handleAddCourses={handleAddCourses}
                              selectedCourses={selectedCourses}
                              handleUpdate={handleUpdate}
                            />
                          )
                        })}
                      </React.Fragment>
                    </Box>
                  )

                // step 2 represents the learning journey summary before submission
                case 1:
                  return (
                    <Box>
                      <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                          Learning Journey Summary
                        </Typography>
                        <ListItem sx={{ py: 1, px: 0 }}>
                          <ListItemText primary="Learning Journey Name" />
                          <Typography variant="body2">
                            {learningJourneyName}
                          </Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }}>
                          <ListItemText primary="Role" />
                          <Typography variant="body2">
                            {selectedRoleName}
                          </Typography>
                        </ListItem>

                        {Object.keys(selectedEditCourses).map((k) => (
                          <ListItem sx={{ py: 1, px: 0 }} key={k}>
                            <ListItemText primary={k} />
                            <Typography variant="body2">
                              {selectedEditCourses[k].length > 1
                                ? selectedEditCourses[k].join(', ')
                                : selectedEditCourses[k]}
                            </Typography>
                          </ListItem>
                        ))}
                      </React.Fragment>
                    </Box>
                  )
                default:
                  return <h1>Error - Page do not exist!</h1>
              }
            })()}
          </Box>

          {/* Stepper form control buttons start ------------------ */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {/* <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button> */}
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
            </Button>
          </Box>
          {/* Stepper form control buttons end ---------------- */}
        </React.Fragment>
      )}
    </Box>
  )
}

export default StaffEditLearningJourney
