import { Box } from '@mui/material'
import CoursesTable from '../../components/course/CoursesTable'

function StaffCompletedCoursesPage() {
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        {/* to change to dynamic user after login implemented */}
        <CoursesTable
          numRows={-1}
          completed={true}
          staffId={130001}
          header="My completed courses"
        />
      </Box>
    </Box>
  )
}

export default StaffCompletedCoursesPage
