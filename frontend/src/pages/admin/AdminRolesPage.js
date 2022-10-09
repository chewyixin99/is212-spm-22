import React from 'react'
import RolesList from '../../components/roles/RolesList'
import SectionHeader from '../../components/common/SectionHeader'
import {
    Box,
    Button,
} from '@mui/material'

import {
    Link
} from 'react-router-dom'

function AdminRolesPage() {
  return (
    <div>
        <Box sx={{ flexDirection: 'row' }}>
            {/* <h1>Roles List</h1> */}
            <SectionHeader header="Roles List"></SectionHeader>
            <Button variant="outlined" component={Link} to="/admin/newrole">
              Create New Role
            </Button>
        </Box>
        <RolesList></RolesList>

    </div>
  )
}





export default AdminRolesPage
