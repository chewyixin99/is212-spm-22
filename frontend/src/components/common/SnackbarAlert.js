import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = ({
  autoHideDuration = 5000,
  snackbarState = {
    open: false,
    vertical: 'bottom',
    horizontal: 'right'
  },
  alertMessage = 'Default snackbar',
  alertSeverity = 'info'
}) => {
  const [ state, setState ] = useState(snackbarState)
  const { vertical, horizontal, open } = state

  useEffect(() => {
    setState(snackbarState)
  }, [snackbarState])

  const handleClose = () => {
    setState({...state, open: false })
  }
  
  return (
    <Snackbar
      anchorOrigin={{vertical, horizontal}}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert severity={alertSeverity} onClose={handleClose}>
        { alertMessage }
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert