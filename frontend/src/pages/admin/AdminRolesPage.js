import React from 'react'
import RolesList from '../../components/roles/RolesList'
import Box, { BoxProps } from '@mui/material/Box';
import SectionHeader from '../../components/common/SectionHeader'

function AdminRolesPage() {
  return (
    <div>
        <Box sx={{ flexDirection: 'row' }}>
            {/* <h1>Roles List</h1> */}
            <SectionHeader header="Roles List"></SectionHeader>
            <button>Create New Role</button>
        </Box>
        <RolesList></RolesList>

    </div>
  )
}





export default AdminRolesPage
