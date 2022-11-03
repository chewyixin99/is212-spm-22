import { Box } from '@mui/material'
import CoursesTable from '../../components/course/CoursesTable'

function AdminCoursesPage() {
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        <CoursesTable numRows={-1} />
      </Box>
    </Box>
  )
}

export default AdminCoursesPage
