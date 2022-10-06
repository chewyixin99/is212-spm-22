import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Select Role to Log in</h1>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Role"
        >
          <MenuItem component={Link} to="/admin">
            HR Admin
          </MenuItem>
          <MenuItem component={Link} to="/manager" disabled>
            Manager
          </MenuItem>
          <MenuItem component={Link} to="/staff">
            Staff
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default LoginPage
