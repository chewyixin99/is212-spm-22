import React from 'react'
import { useParams } from 'react-router-dom'

import { Alert, Box, Breadcrumbs, Stack, Typography } from '@mui/material'
import { ENDPOINT } from '../../constants'
import StyledBreadcrumb from '../common/StyledBreadcrumb'

function Roles() {
  const { role_id } = useParams()
  const baseUrl = ENDPOINT
  const [role, setRole] = React.useState([])
  const [roleSkills, setRoleSkills] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseUrl}/roles/${role_id}`)
        .then((results) => results.json())
        .then((data) => {
          setRole(data.data)
        })
      await fetch(`${baseUrl}/roles/${role_id}/skills`)
        .then((results) => results.json())
        .then((data) => {
          setRoleSkills(data.data.skills)
        })
    }
    fetchData().catch(console.error)
  }, [])
  console.log(role)

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
          {role_id}: {role.role_name}
        </Typography>
        <Stack spacing={4} sx={{ marginTop: '5vh', marginBottom: '10vh ' }}>
          {role.role_status == 'Retired' ? (
            <Alert severity="error">
              This role is no longer available for enrollment.
            </Alert>
          ) : (
            <Alert severity="info">
              This role is currently available for enrollment
            </Alert>
          )}
          <Breadcrumbs aria-label="breadcrumb">
            {roleSkills.map((skill) =>
              skill.status == 'Active' ? (
                // ? <Link underline="hover" color="inherit" href="#"> {skill.skill_name}</Link>
                <StyledBreadcrumb>
                  {/* to add link to the skill page */}
                  {skill.skill_name}
                </StyledBreadcrumb>
              ) : (
                <Typography></Typography>
              )
            )}
          </Breadcrumbs>
        </Stack>
      </Box>
    </Box>
  )
}

export default Roles
