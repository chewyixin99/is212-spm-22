import React from 'react'
import {
  Link,
} from 'react-router-dom'

import { styled } from '@mui/material/styles'
import {
  Box,
  Paper,
  Stack,
  Button,
  Grid,
  LinearProgress,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material'

import Course from '../../components/Course/Course'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))


function AdminHomePage() {
  const baseUrl = 'http://localhost:5001'
  const [courseList, setCourseList] = React.useState([]);

  React.useEffect(() => {
    const fetchCourses = async () => {
      await fetch(`${baseUrl}/courses`)
        .then(results => results.json())
        .then(data => {
          setCourseList(data.data.courses)
        })
    }
    fetchCourses().catch(console.error)
  }, [])

  return (
    <Box sx={{ width: '50%', margin: 'auto'}}>
      <Typography 
        variant="h3"
        nowrap
        component="a"
        sx={{
          mr: 2,
          my: 3,
          display: { xs: 'none', md: 'flex'},
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      />
      <Box sx={{ marginBottom: '10vh', justifyContent: 'center' }}>
        <Typography variant="h4" component="div" gutterBottom>
          Courses
        </Typography>
        <Stack spacing={2}>
          {
            courseList.length > 1
              ? (
                // courseList[0].course_name
                courseList.map((course) => (
                  <Item
                    key={course.course_id}
                    component={Link}
                    to={`courses/${course.course_id}`}
                    sx={{ textDecoration: 'none' }}
                  >
                    {course.course_name}
                  </Item>
                ))
              )
              : (
                <Typography variant="h5" component="div" gutterBottom>
                  No courses created yet.
                </Typography>
              )
          }
        </Stack>
      </Box>
    </Box>
  )
}

export default AdminHomePage
