
import { Box, Grid, TextField, FormControlLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
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

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const steps = ['Learning Journey Information', 'Select Role', 'Select Skills', 'Select Courses']


const steps = ['Learning Journey Information', 'Select Role', 'Select Skills', 'Select Courses']
function NewLearningJourney() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [skillData, setSkillData] = React.useState([]);
  const [selectedSkill, setSelectedSkill] = React.useState("");
  const [coursesBySkill, setCoursesBySkill] = React.useState([]);


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
              case 0:
                return (
                  <Box sx={{ height: '50vh' }}>
                    <React.Fragment>
                      <Typography variant="h6" gutterBottom>
                        Learning Journey Set Up
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
                    </React.Fragment>
                  </Box>
                );
              case 1:
                return <Box sx={{ height: '50vh', color: 'red' }}>
                  <React.Fragment>
                    <h1>Insert Role List here</h1>
                    {/* <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Software Engineer</MenuItem>
                        <MenuItem value={2}>Product Manager</MenuItem>
                        <MenuItem value={3}>DevOps Engineer</MenuItem>
                      </Select>
                    </FormControl> */}
                  </React.Fragment>
                </Box>;
              case 2:
                return <Box sx={{ height: '50vh', color: 'red' }}>
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
                </Box>;
              case 3:
                return <Box sx={{ height: '50vh', color: 'red' }}>
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
                </Box>;
              case 4:
                return <input type="text" placeholder='4' />;
              default:
                return <h1>Error - Page do not exist!</h1>;
            }
          })()}

          {/* form here */}





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

              {activeStep === steps.length - 1 ? 'Finish' : activeStep ===  2 ? selectedSkill !== "" ? 'Next' : '' : 'Next'}

            </Button>
          </Box>
        </React.Fragment>
      )}

    </Box>
  )
}

export default NewLearningJourney


