import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import propTypes from 'prop-types'

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
  MenuItem
} from '@mui/material'

import { Link } from 'react-router-dom'

import SectionHeader from '../common/SectionHeader'
import RolesTableRow from '../learningJourney/RolesTableRow'
import TableRowEmptyStatus from '../common/TableRowEmptyStatus'
import TableRowLoadingStatus from '../common/TableRowLoadingStatus'
import useRolesLoader from '../../services/roles/useRolesLoader'
import CoursesBySkill from './CoursesBySkill'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import Card from '@mui/material/Card';

import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

import { RESPONSE_CODES, ENDPOINT } from '../../constants'


const steps = ['Input Learning Journey Name and Role', 'Select Skills and Courses', 'Review Learning Journey']

function NewLearningJourney({ numRows }) {
  const [roleData, isLoading, total, error] = useRolesLoader(numRows)
  const isEmpty = roleData.length === 0

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [skillData, setSkillData] = React.useState([]);
  const [selectedSkill, setSelectedSkill] = React.useState("");
  const [selectedRoleId, setSelectedRoleId] = React.useState(0);
  const [selectedRoleName, setSelectedRoleName] = React.useState("N.A.");

  const [learningJourneyName, setLearningJourneyName] = React.useState("");
  const [selectedCourses, setSelectedCourses] = React.useState({});
  const [isCourseSelected, setIsCourseSelected] = React.useState(false);

  // select courses by skill start ----------------------------

  // collate all selected courses by skill
  const handleAddCourses = (coursesArr, name) => {

    setSelectedCourses(prevState => ({
      ...prevState,
      [name]: coursesArr
    }));
  }

  // retrieve skills based on role id
  const getData = async (id, name) => {

    setSelectedRoleId(id);
    setSelectedRoleName(name);

    if (id != 0 || name != "N.A.") {
      axios.get(`${ENDPOINT}/roles/${id}/skills`)
        .then(res => {
          console.log(res.data.data);
          setSkillData(res.data.data.skills)
          setSelectedCourses({});
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  // select courses by skill end ----------------------------

  // render role list start ------------------------

  const renderSubheader = () => {
    if (isLoading) {
      return 'Loading...'
    }
    if (isEmpty) {
      return 'Total Number of Roles: 0'
    }
    return `Total Number of Roles: ${numActive()}`
  }

  const renderTableStatuses = () => {
    if (isLoading) {
      return <TableRowLoadingStatus cols={4} />
    } else if (!isLoading && !error && isEmpty) {
      return <TableRowEmptyStatus cols={4} content="No data available." />
    } else if (!isLoading && !isEmpty && error) {
      return (
        <TableRowEmptyStatus
          cols={4}
          content="Currently unable to retrieve data."
        />
      )
    }
  }


  const numActive = () => {
    var total = 0
    roleData.map((roleInfo) => {
      if (roleInfo.status == 'Active') {
        total += 1
      }
    })
    return total
  }

  const renderTableRows = () => {
    if (!isEmpty && !isLoading && !error && roleData) {
      return (
        <>
          {roleData.map((roleInfo, index) => {
            if (roleInfo.status != 'Active') {
              return null
            } else {
              return (
                <RolesTableRow roleInfo={roleInfo} getData={getData} selectedRoleId={selectedRoleId} key={index} />
              )
            }
          }
          )}
        </>
      )
    }
  }

  // render role list end ------------------------

  // stepper form functions start ------------------------

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === steps.length - 1) {
      // submit learning journey
      submitLearningJourney();
    }
    // else if (activeStep === 1) {

    //   alert("Please select at least one skill and course.");
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/staff/learning-journey')
  };

  const submitLearningJourney = () => {
    // submit learning journey
    alert(JSON.stringify(selectedCourses) + JSON.stringify(learningJourneyName) + JSON.stringify(selectedRoleName));
  }

  // stepper form functions end ------------------------

  // select skill functions start ------------------------

  const handleSkillChange = (event) => {
    console.log(event.target.value);
    setSelectedSkill(event.target.value);
  };
  // select skill functions start ------------------------

  const handleDeleteCourses = () => {
    let flag = false

    Object.keys(selectedCourses).forEach((function (k) {
      console.log(selectedCourses[k]);
      if (selectedCourses[k].length > 0) {
        flag = true
      }
    }
    ))

    if (flag) {
      setIsCourseSelected(true);
    }
    else {
      setIsCourseSelected(false);
    }
  }


  useEffect(() => {
    handleDeleteCourses();
  }, [selectedCourses, selectedRoleId, selectedRoleName]);

  return (
    <Box sx={{ width: '50%', margin: 'auto', padding: '40px 0' }}>
      <h1>New Learning Journey</h1>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ mt: 2, mb: 1}}>
              You have successfully created {learningJourneyName !== "" ? learningJourneyName : "a new Learning Journey"}!
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
                              label="Name of learning Journey"
                              fullWidth
                              variant="standard"
                              onChange={e => setLearningJourneyName(e.target.value)}
                            />
                          </Grid>

                        </Grid>

                        <Box
                          sx={(theme) => ({
                            // [theme.breakpoints.up('md')]: {
                            //   width: '50%',
                            // },
                            // width: '80%',
                            // margin: 'auto',
                          })}
                        >
                          <Typography variant="h6" mt={5}>
                            Select Role
                          </Typography>
                          <SectionHeader
                            // header="New Learning Journey"
                            subHeader={renderSubheader()}
                          />

                          <TableContainer component={Paper}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>ID</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Status</TableCell>
                                  <TableCell align="center">Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {renderTableStatuses()}
                                {renderTableRows()}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <Typography variant="h6" mt={5} gutterBottom>
                            {selectedRoleName == 'N.A.' ? 'Please select a role' : `Selected Role: ${selectedRoleName}`}
                          </Typography>
                        </Box>
                      </React.Fragment>
                    </Box>
                  );
                // step 2 represents skills and courses selection
                case 1:
                  return (
                    <Box sx={{ minHeight: '50vh' }}>
                      <React.Fragment>
                        <Typography variant="subtitle1" sx={{ fontSize: '1rem' }}>
                          Minimum 1 course selected.
                        </Typography>
                        {skillData?.map((item) => {
                          return (<CoursesBySkill
                            item={item}
                            key={item.skill_id}
                            handleAddCourses={handleAddCourses}
                          />)
                        })}
                      </React.Fragment>
                    </Box>
                  );
                // step 3 represents the learning journey summary before submission
                case 2:
                  return (
                    <Box>
                      <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                          Learning Journey Summary
                        </Typography>
                        <ListItem sx={{ py: 1, px: 0 }} >
                          <ListItemText primary='Learning Journey Name' />
                          <Typography variant="body2">{learningJourneyName}</Typography>
                        </ListItem>
                        <ListItem sx={{ py: 1, px: 0 }} >
                          <ListItemText primary='Role' />
                          <Typography variant="body2">{selectedRoleName}</Typography>
                        </ListItem>


                        {
                          Object.keys(selectedCourses).map(k => (
                            <ListItem sx={{ py: 1, px: 0 }} key={k}>
                              <ListItemText primary={k} />
                              <Typography variant="body2">{selectedCourses[k].length > 1 ? selectedCourses[k].join(', ') : selectedCourses[k]}</Typography>

                            </ListItem>
                          ))
                        }
                      </React.Fragment>
                    </Box>
                  );
                default:
                  return <h1>Error - Page do not exist!</h1>;
              }
            })()}
          </Box>

          {/* Stepper form control buttons start ------------------ */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}
              disabled={activeStep === 0 ? selectedRoleName !== 'N.A.' ? false : true : activeStep === 1 ? isCourseSelected ? false : true : activeStep === 2 ? false : true}
            >

              {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}

            </Button>
          </Box>
          {/* Stepper form control buttons end ---------------- */}
        </React.Fragment>
      )

      }

    </Box>
  );


}

export default NewLearningJourney
