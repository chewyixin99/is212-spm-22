import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = ({
  autoHideDuration = 5000,
  open,
  alertMessage = 'Default snackbar',
  alertSeverity = 'info'
}) => {
  const [ isOpen, setIsOpen ] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleClose = () => {
    setIsOpen(false)
  }
  
  return (
    <Snackbar
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      open={isOpen}
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