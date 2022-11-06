import { Box } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import SkillsTable from '../../components/skills/SkillsTable'

function StaffCompletedSkillsPage() {
  const { staffId } = useOutletContext()
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        {/* to change to dynamic user after login implemented */}
        <SkillsTable
          numRows={-1}
          completed={true}
          staffId={staffId}
          header="My completed skills"
        />
      </Box>
    </Box>
  )
}

export default StaffCompletedSkillsPage
