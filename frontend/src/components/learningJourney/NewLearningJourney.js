import React, { useEffect } from 'react'
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


// transfer list functions start ------------------------

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

// transfer list functions end ------------------------

const steps = ['Input Learning Journey Name & Role', 'Select Skills', 'Select Courses', 'Review Learning Journey']

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

function NewLearningJourney({ numRows }) {
  const [roleData, isLoading, total, error] = useRolesLoader(numRows)
  // console.log('---> RolesTable, roleData: ', roleData)
  const isEmpty = roleData.length === 0

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [skillData, setSkillData] = React.useState([]);
  const [selectedSkill, setSelectedSkill] = React.useState("");
  const [coursesBySkill, setCoursesBySkill] = React.useState([]);

  const renderSubheader = () => {
    if (isLoading) {
      return 'Loading...'
    }
    if (isEmpty) {
      return 'Total Number of Roles: 0'
    }
    return `Total Number of Roles: ${total}`
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

  const renderTableRows = () => {
    if (!isEmpty && !isLoading && !error && roleData) {
      return (
        <>
          {roleData.map((roleInfo, index) => (
            <RolesTableRow roleInfo={roleInfo} key={index} />
          ))}
        </>
      )
    }
  }

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

  const handleReset = () => {
    setActiveStep(0);
  };

  // stepper form functions end ------------------------

  // select skill functions start ------------------------

  const handleSkillChange = (event) => {
    console.log(event.target.value);
    setSelectedSkill(event.target.value);
    getCourseDataBySkill(event.target.value)
  };

  const getCourseDataBySkill = (id) => {
    axios.get(`http://localhost:5001/skills/${id}/courses`)
      .then((response) => {
        console.log(response.data);
        setCoursesBySkill(response.data.data.courses)
        let res = response.data.data.courses
        let courseIdList = res.map((course) => course.course_id)
        console.log(courseIdList)
        setLeft(courseIdList)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // select skill functions start ------------------------


  // transfer list functions start ------------------------

  // left data state represents the courses that are available to be added to the learning journey
  // right data state represents the courses that are added to the learning journey

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  // transfer list functions end ------------------------

  useEffect(() => {
    axios.get('http://localhost:5001/skills')
      .then(res => {
        setSkillData(res.data.data.skills)
        console.log(res.data.data.skills)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


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
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {(() => {
            switch (activeStep) {
              // step 1 represents the learning journey name input and role selection
              case 0:
                return (
                  <Box sx={{ }}>
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
                      </Box>
                    </React.Fragment>
                  </Box>
                );
              // step 2 represents skills selection
              case 1:
                return (
                  <Box sx={{ height: '50vh', color: 'red' }}>
                    <React.Fragment>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Skills based on role</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedSkill}
                          label="Skills"
                          onChange={handleSkillChange}
                        >
                          {skillData?.map((item) => {
                            return <MenuItem key={item.skill_id} value={item.skill_id}>{item.skill_name}</MenuItem>
                          })}

                        </Select>
                      </FormControl>
                    </React.Fragment>
                  </Box>
                );
              // step 3 represents courses selection
              case 2:
                return (
                  <Box sx={{ height: '50vh', color: 'red' }}>
                    <React.Fragment>
                      <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>{customList('Choices', left)}</Grid>
                        <Grid item>
                          <Grid container direction="column" alignItems="center">
                            <Button
                              sx={{ my: 0.5 }}
                              variant="outlined"
                              size="small"
                              onClick={handleCheckedRight}
                              disabled={leftChecked.length === 0}
                              aria-label="move selected right"
                            >
                              &gt;
                            </Button>
                            <Button
                              sx={{ my: 0.5 }}
                              variant="outlined"
                              size="small"
                              onClick={handleCheckedLeft}
                              disabled={rightChecked.length === 0}
                              aria-label="move selected left"
                            >
                              &lt;
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid item>{customList('Chosen', right)}</Grid>
                      </Grid>
                    </React.Fragment>
                  </Box>
                );
              // step 4 represents the learning journey summary before submission
              case 3:
                return (
                  <Box>
                    <React.Fragment>
                      <Typography variant="h6" gutterBottom>
                        Learning Journey Summary
                      </Typography>

                      <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={selectedSkill} />
                        <Typography variant="body2">{right.join(', ')}</Typography>
                      </ListItem>

                    </React.Fragment>
                  </Box>
                );
              default:
                return <h1>Error - Page do not exist!</h1>;
            }
          })()}

          {/* Stepper form control buttons start */}
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

            <Button onClick={handleNext}>

              {activeStep === steps.length - 1 ? 'Finish' : activeStep === 2 ? selectedSkill !== "" ? 'Next' : '' : 'Next'}

            </Button>
          </Box>
          {/* Stepper form control buttons end */}
        </React.Fragment>
      )
    }
    </Box>
  );

}

// RolesTable.propTypes = {
//   numRows: propTypes.number,
// }

export default NewLearningJourney

