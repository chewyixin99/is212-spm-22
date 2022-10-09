import React from 'react'
// import RolesList from '../../components/roles/RolesList'
import SectionHeader from '../../components/common/SectionHeader'
import TextFields from '../../components/common/TextField'
import SelectLabels from '../../components/common/DropDown'
import MultilineTextFields from '../../components/common/TextMulti'
import {
    Box,
    Button,
    Stack
} from '@mui/material'

import {
    Link
} from 'react-router-dom'

function AdminNewRole() {
  var obj = {HR: "Human Resource",
    IT: "IT",
    Ops: "Operations",
    Finance: "Finance",
    Sales: "Sales"
    }

  return (
    <Box sx={{
        width: '50%', margin: 'auto'
    }}>
        <Box sx={{mt: 3}}>
        <Stack direction='row' justifyContent="space-between">
            <SectionHeader header="New Role"></SectionHeader>
            <Button variant="outlined">
              Create
            </Button>
        </Stack>
        </Box>

        <Box sx={{mt: 3}}>
            <Stack direction='row' spacing={1}>
                <TextFields field="Role Name"></TextFields>
                <SelectLabels options={obj}></SelectLabels>
            </Stack>
            <MultilineTextFields></MultilineTextFields>
        </Box>
    </Box>
  )
}

{/* <Stack direction="row" spacing={2}>
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Item 3</Item>
</Stack> */}


export default AdminNewRole
