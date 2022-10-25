import { Link } from 'react-router-dom'

import { emphasize, styled } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors'

const StyledBreadcrumb = styled(Link)(({ theme }) => ({
  backgroundColor: blueGrey[50],
  height: theme.spacing(6),
  '&:hover, &:focus': {
    backgroundColor: blueGrey[100],
  },
  '&:active': {
    boxShadow: theme.shadows[1],
    backgroundColor: emphasize(blueGrey[100], 0.12),
  },
  padding: theme.spacing(1),
  textDecoration: 'none',
  fontSize: 'small',
  lineHeight: '3.5',
  borderRadius: '12px',
  border: '1px solid',
}))

export default StyledBreadcrumb
