import React from 'react'
import { useParams } from 'react-router-dom'

import { Alert, Box, Breadcrumbs, Stack, Typography } from '@mui/material'
import { ENDPOINT, STATUS } from '../../constants'
import DescriptionRow from '../common/DescriptionRow'
import StyledBreadcrumb from '../common/StyledBreadcrumb'

function Course() {
  const { course_id } = useParams()
  const baseUrl = ENDPOINT
  const [course, setCourse] = React.useState([])
  const [courseSkills, setCourseSkills] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseUrl}/courses/${course_id}`)
        .then((results) => results.json())
        .then((data) => {
          setCourse(data.data)
        })
      await fetch(`${baseUrl}/courses/${course_id}/skills`)
        .then((results) => results.json())
        .then((data) => {
          setCourseSkills(data.data.skills)
        })
    }
    fetchData().catch(console.error)
  }, [])

  const renderAlertMessage = (status) => {
    if (status === STATUS.RETIRED) {
      return (
        <Alert severity="error">
          This course is no longer available for enrollment.
        </Alert>
      )
    } else if (status === STATUS.PENDING) {
      return <Alert severity="warning">This course is pending approval.</Alert>
    }
    return (
      <Alert severity="info">
        This course is currently available for enrollment.
      </Alert>
    )
  }

  const checkActive = (skill) => {
    return skill.status === STATUS.ACTIVE
  }

  const renderCourseSkills = () => {
    if (courseSkills.filter(checkActive).length > 0) {
      return (
        <Stack>
          <Typography
            sx={{ color: 'text.secondary' }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Skills under course
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            {courseSkills.filter(checkActive).map((skill) => (
              <StyledBreadcrumb>
                {/* to add link to the skill page */}
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
          There are no active skills mapped to this course yet.
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
          {/* eslint-disable-next-line */}
          {course_id}:{course.course_name}
        </Typography>
        <Stack spacing={4} sx={{ marginTop: '5vh', marginBottom: '10vh ' }}>
          {renderAlertMessage(course.course_status)}
          {renderCourseSkills()}
          <DescriptionRow title="Course ID" value={course.course_id} />
          <DescriptionRow title="Course type" value={course.course_type} />
          <DescriptionRow
            title="Course category"
            value={course.course_category}
          />
          <DescriptionRow
            title="Course description"
            value={course.course_desc}
          />
          <DescriptionRow title="Course status" value={course.course_status} />
        </Stack>
      </Box>
    </Box>
  )
}

export default Course
