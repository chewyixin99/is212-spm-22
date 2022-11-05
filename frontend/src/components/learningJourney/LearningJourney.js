import React, { useState, useEffect } from 'react'
import {
  Link,
} from 'react-router-dom'

import {
  Box,
  Paper,
  Stack,
  CardMedia,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'

import { ENDPOINT } from '../../constants'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

function LearningJourneyPage() {

  const [learningJourneyList, setlearningJourneyList] = useState([])

  const getLJData = async (id) => {
    const response = await axios.get(`${ENDPOINT}/learning_journeys`)
    const data = response.data.data.learning_journeys
    setlearningJourneyList(data)
  }


  useEffect(() => {
    getLJData(1)
  }, [])

  const test = async () => {

    await fetch(`${ENDPOINT}/learning_journeys/${id}`)
      .then((results) => results.json())
      .then((data) => {
        return data.data.courses
      })
      .then(async (data) => {
        console.log(data);
        const arr = {}
        data.map((course) => {
          fetch(`${ENDPOINT}/courses/${course.course_id}/skills`)
            .then((results) => results.json())
            .then((data) => {

              setSkillsInCourses(prevState => ({
                ...prevState,
                [data.data.skills[0].skill_id]: {
                  "skill_name": data.data.skills[0].skill_name,
                  "skill_desc": data.data.skills[0].skill_desc,
                  "status": data.data.skills[0].status
                }
              }));
            })
        })
        setSkillsInCourses(arr)
        console.log(skillsInCourses);
      })
  }


  // courses.map(async (course) => {
  //   await fetch(`${ENDPOINT}/courses/${course.course_id}/skills`)
  //   .then((results) => results.json())
  //   .then((data) => {
  //       setSkillsInCourses(skills => [...skills, data.data.skills[0]])
  //   })
  // })  


  const checkRoleActive = () => {
    return role.status === STATUS.ACTIVE
  }
  const checkCourseActive = (course) => {
    return course.course_status === STATUS.ACTIVE
  }
  const checkSkillActive = (skill) => {
    return skill?.skill.status === STATUS.ACTIVE
  }

  const renderCourses = () => {
    console.log(courses);
    if (courses.filter(checkCourseActive).length > 0) {
      return (
        <Stack>
          <Typography
            sx={{ color: 'text.secondary' }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Courses taken under Learning Journey
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            {courses.filter(checkCourseActive).map((course) => (
              <StyledBreadcrumb key={course.course_id} to={`/staff/courses/${course.course_id}`}>
                {course?.course_name}
              </StyledBreadcrumb>

            ))}
          </Breadcrumbs>
        </Stack>
      )
    }
  }

  const renderSkillsInCourses = () => {
    if (skillsInCourses.length > 0) {
      return (
        <Stack>
          <Typography
            sx={{ color: 'text.secondary' }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Skills from courses taken under Learning Journey
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">

            {Object.keys(skillsInCourses).map(k => (
              <StyledBreadcrumb key={k}>
                {/* to add link to the course page */}
                {skillsInCourses[k].skill_name}
                {skillsInCourses.length}
              </StyledBreadcrumb>
            ))
            }
          </Breadcrumbs>
        </Stack>
      )

    }
  }

  const renderRoleSkills = () => {
    if (skills.filter(checkRoleActive).length > 0) {
      return (
        <Stack>
          <Typography
            sx={{ color: 'text.secondary' }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Skills under role
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            {skills.filter(checkRoleActive).map((skill) => (
              <StyledBreadcrumb key={skill.skill_id} to={`/staff/skills/${skill.skill_id}`}>
                {skill.skill_name}
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
          There are no active skills under this role yet.
        </Typography>
      )
    }
  }

  return (
    <Box sx={{ width: '50%', margin: 'auto' }}>
      <Box sx={{ display: 'flex', padding: '2rem', justifyContent: 'space-between'}}>
      <h1>My Learning Journey</h1>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        component={Link}
        to="new"
      >
        <AddIcon />
      </IconButton>
      </Box>

      <Stack spacing={2}>
        {learningJourneyList?.length > 0 ? (learningJourneyList.map((item) => (
          <Item
            key={item?.learning_journey_id}
            component={Link}
            to={`${item?.learning_journey_id}`}
            sx={{ textDecoration: 'none' }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={10}>
                <Typography variant="h5" component="div">
                  {item.learning_journey_name}
                </Typography>
                <Typography variant="body1" component="div">
                  {item.role_id}
                </Typography>
                {/* <Typography variant="body1" component="div">
                  {item.status}
                </Typography> */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '1rem',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ width: '80%', mr: 1 }}>
                    {/* {item.progress === 100 ? (
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        color="success"
                      />
                    ) : (
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                      />
                    )} */}
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">
                      {`${item.progress}%`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  object-fit
                  image={item.bannerImg}
                />
              </Grid>
            </Grid>
          </Item>
        ))) : (<h3>No Learning Journey found.</h3>)}
      </Stack>
    </Box>
  )
}

export default LearningJourneyPage
