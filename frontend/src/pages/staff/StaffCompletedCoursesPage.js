import { Box } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import CoursesTable from '../../components/course/CoursesTable'

function StaffCompletedCoursesPage() {
  const { staffId } = useOutletContext()
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        {/* to change to dynamic user after login implemented */}
        <CoursesTable
          numRows={-1}
          completed={true}
          staffId={staffId}
          header="My completed courses"
        />
      </Box>
    </Box>
  )
}

export default StaffCompletedCoursesPage
