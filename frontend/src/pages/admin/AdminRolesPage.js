import React from 'react'
import RolesList from '../../components/Roles/RolesList'
import Box, { BoxProps } from '@mui/material/Box';


function AdminRolesPage() {
  return (
    <div>
        {/* Insert Margin */}
        <Box sx={{ flexDirection: 'row' }}>
            <h1>Roles List</h1>
            <button>Create New Role</button>
        </Box>
        <RolesList></RolesList>

    </div>
  )
}





export default AdminRolesPage
