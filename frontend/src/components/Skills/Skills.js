import React from 'react'
import { 
    Link,
    useParams,
 } from 'react-router-dom'
 
 import { emphasize, styled } from '@mui/material/styles'
 import { blueGrey } from '@mui/material/colors'
 import LocalOfferIcon from '@mui/icons-material/LocalOffer';
 import CategoryIcon from '@mui/icons-material/Category';

 import {
    Alert,
    Box,
    Breadcrumbs,
    Stack,
    Typography,
} from '@mui/material'

const StyledBreadcrumb = styled(Link)(({theme}) => ({
  backgroundColor: blueGrey[50],
  height: theme.spacing(6),
  "&:hover, &:focus" : {
    backgroundColor: blueGrey[100]
  },
  "&:active": {
    boxShadow: theme.shadows[1],
    backgroundColor: emphasize(blueGrey[100], 0.12)
  },
  padding: theme.spacing(1),
  textDecoration: 'none',
  borderRadius: '12px',
  border: '1px solid',
}))

const IconText = styled(Typography)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
}))

function Skill() {
  const { skill_id } = useParams()
  const baseUrl = 'http://localhost:5001'
  const [skill, setSkill] = React.useState([]);
  const [skillCourses, setSkillCourses] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseUrl}/skills/${skill_id}`)
        .then(results => results.json())
        .then(data => {
          setSkill(data.data)
        })
      await fetch(`${baseUrl}/skills/${skill_id}/courses`)
        .then(results => results.json())
        .then(data => {
            setSkillCourses(data.data.courses)
        })
    }
    fetchData().catch(console.error)
  }, [])
  console.log(skill)

  return (
    <Box sx={{ width: '50%', margin: 'auto'}}>
        <Typography
          variant="h3"
          noWrap
          component="a"
          sx={{
            mr: 2,
            my: 3,
            display: { xs:'none', md: 'flex' },
            fontFamily: 'monospace',
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        />
        <Box sx={{ marginBottom: '10vh', justifyContent: 'center' }}>
          <Typography variant="h4" component="div" gutterBottom>
            {skill.skill_name} [skill: {skill.skill_id}]
          </Typography>
          <Stack spacing={4} sx={{ marginTop: '5vh', marginBottom: '10vh '}}>
            {
              skill.status == 'Retired'
                ? <Alert severity='error'>This skill is no longer available for learning.</Alert>
                : <Alert severity='info'>This skill is currently available for learning</Alert>
            }
            <Breadcrumbs aria-label="breadcrumb">
              {
                  (
                      skillCourses.map((course) => (
                        course.course_status == "Active"
                          // ? <Link underline="hover" color="inherit" href="#"> {course.course_name}</Link>
                          ? <StyledBreadcrumb>
                            {/* to add link to the course page */}
                              {course.course_name}
                            </StyledBreadcrumb>
                          : <Typography></Typography>
                      ))
                  )
              }
            </Breadcrumbs>

            <Typography>
              {skill.skill_desc}
            </Typography>
          </Stack>
        </Box>
    </Box>
  )
}

export default Skill