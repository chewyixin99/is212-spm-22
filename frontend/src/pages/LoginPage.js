import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/common/SectionHeader'
import { ENDPOINT } from '../constants'
import AdminOutlet from './admin/AdminOutlet'

const roleName = {
  1: 'ADMIN',
  2: 'STAFF',
  3: 'MANAGER',
  4: 'TRAINER',
}

function LoginPage() {
  const [role, setRole] = useState('')
  const [staffId, setStaffId] = useState('')

  const [allStaffs, setAllStaffs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${ENDPOINT}/staffs`)
      .then((response) => response.json())
      .then((responseJSON) => {
        setAllStaffs(responseJSON.data.staffs)
      })
  }, [])

  const handleRoleChange = (event) => {
    setRole(event.target.value)
  }
  const handleStaffIdChange = (event) => {
    setStaffId(event.target.value)
  }
  const checkStaffRole = (staff) => {
    return staff.type === role
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem('role', JSON.stringify(roleName[role]))
    localStorage.setItem('staffId', JSON.stringify(staffId))
    navigate(`/${roleName[role].toLowerCase()}`)
  }

  return (
    <Box sx={{ my: 5 }}>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up('md')]: {
            width: '50%',
          },
          width: '80%',
          margin: 'auto',
        })}
      >
        <SectionHeader header="Login" />
        <form>
          <Typography
            sx={{ color: 'text.secondary' }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Select role to log in with
          </Typography>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="select-role-label">Role</InputLabel>
            <Select
              labelId="select-role-label"
              id="select-role"
              label="Role"
              value={role}
              onChange={handleRoleChange}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={3} disabled>
                Manager
              </MenuItem>
              <MenuItem value={2}>Staff</MenuItem>
            </Select>
          </FormControl>
          <Typography
            sx={{ color: 'text.secondary', marginTop: 5 }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Select staff ID to log in with
          </Typography>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="select-staff-label">Staff ID</InputLabel>
            <Select
              labelId="select-staff-label"
              id="select-staff"
              label="StaffID"
              value={staffId}
              onChange={handleStaffIdChange}
              disabled={role === ''}
            >
              {allStaffs.filter(checkStaffRole).map((singleStaff) => {
                return (
                  <MenuItem
                    value={singleStaff.staff_id}
                    key={singleStaff.staff_id}
                  >
                    {singleStaff.staff_id}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Button
            onClick={handleSubmit}
            sx={{ marginTop: 5 }}
            variant="contained"
            disabled={role === '' || staffId === ''}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default LoginPage
