import { Box } from '@mui/material'
import SkillsTable from '../../components/skills/SkillsTable'

function StaffCompletedSkillsPage() {
  return (
    <Box>
      <Box sx={{ my: 5 }}>
        {/* to change to dynamic user after login implemented */}
        <SkillsTable
          numRows={-1}
          completed={true}
          staffId={130001}
          header="My completed skills"
        />
      </Box>
    </Box>
  )
}

export default StaffCompletedSkillsPage
