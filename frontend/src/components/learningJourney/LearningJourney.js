import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Box, Breadcrumbs, Stack, Typography } from '@mui/material'
import DescriptionRow from '../common/DescriptionRow'
import StyledBreadcrumb from '../common/StyledBreadcrumb'
import ConfirmationDialog from '../common/ConfirmationDialog'
import useDialogState from '../../services/common/useDialogState'
import EditButtons from '../common/EditButtons'
import BackNextButtons from '../common/BackNextButtons'
import EditIcon from '@mui/icons-material/Edit';

import { ENDPOINT, STATUS } from '../../constants'


function LearningJourney() {
  const { id } = useParams()
  const [learningJourney, setLearningJourney] = React.useState({})
  const [role, setRole] = React.useState({})
  const [courses, setCourses] = React.useState([])
  const [skills, setSkills] = React.useState([])
  const [skillsInCourses, setSkillsInCourses] = React.useState({})

  useEffect(() => {
    const fetchData = async () => {

      await fetch(`${ENDPOINT}/learning_journeys/${id}`)
        .then((results) => results.json())
        .then((data) => {
          setLearningJourney(data.data.learning_journey)
          setCourses(data.data.courses)
          console.log(data.data.courses);
          // data.data.courses.map((course) => {
          //   test(course)

          // })
          console.log(skillsInCourses);
          return data.data.learning_journey.role_id
        })
        .then(async (data) => {
          await fetch(`${ENDPOINT}/roles/${data}/skills`)
            .then((results) => results.json())
            .then((data) => {
              setSkills(data.data.skills)
            })
          return data
        })
        .then(async (data) => {
          await fetch(`${ENDPOINT}/roles/${data}`)
            .then((results) => results.json())
            .then((data) => {
              console.log(data.data);
              setRole(data.data)
            })
          return data
        })

    }

    fetchData().catch(console.error)
    test()
    console.log(skills);
    console.log(courses);
    console.log(role);
    console.log(skillsInCourses);
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
          {learningJourney.learning_journey_name}
          <Link to="edit">
            <EditIcon sx={{marginLeft: "1rem"}}/>
          </Link>
        </Typography>
        <Stack spacing={4} sx={{ marginTop: '5vh', marginBottom: '10vh ' }}>
          <DescriptionRow title="Role ID" value={role.role_id?.toString()} />
          <DescriptionRow title="Role Name" value={role.role_name} />
          <DescriptionRow title="Role Description" value={role.role_desc} />
          <DescriptionRow title="Role Status" value={role.status} />
          {renderRoleSkills()}
          {renderCourses()}
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
                  <StyledBreadcrumb key={k} to={`/staff/skills/${k}`}>
                    {skillsInCourses[k] ? skillsInCourses[k].skill_name : "N.A."}
                  </StyledBreadcrumb>
              ))}

            </Breadcrumbs>
          </Stack>

          {/* {renderSkillsInCourses()} */}
          {/* {renderAlertMessage(role.status)}


          {renderActionButtons()} */}
        </Stack>
      </Box>
    </Box>
  )
}

export default LearningJourney
