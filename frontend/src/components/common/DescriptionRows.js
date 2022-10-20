import {
    Box,
    Typography,
} from '@mui/material'

const DescriptionRows = (title, value) => {
    return <Box sx={{ mb: 3 }}>
      <Typography sx={{ color: 'text.secondary' }} variant="subtitle1" display="block" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" display="block" gutterBottom>
        {value}
      </Typography>
    </Box>
}

export default DescriptionRows