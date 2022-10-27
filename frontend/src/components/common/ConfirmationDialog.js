import React from 'react'
import propTypes from 'prop-types'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

const ConfirmationDialog = ({
  dialogTitle,
  dialogBody,
  isOpen,
  closeCallback,
  backCallback,
  backButtonTitle,
  proceedCallback,
  proceedButtonTitle,
  proceedColor,
  isLoading,
}) => {
  return (
    <Box>
      <Dialog open={isOpen} onClose={closeCallback}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogBody}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={backCallback || closeCallback} autoFocus>
            {backButtonTitle}
          </Button>
          <LoadingButton
            variant="contained"
            loading={isLoading}
            color={proceedColor}
            onClick={proceedCallback}
          >
            {proceedButtonTitle}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

ConfirmationDialog.propTypes = {
  dialogTitle: propTypes.string,
  dialogBody: propTypes.string,
  isOpen: propTypes.bool,
  closeCallback: propTypes.func,
  backCallback: propTypes.func,
  backButtonTitle: propTypes.string,
  proceedCallback: propTypes.func,
  proceedButtonTitle: propTypes.string,
  proceedColor: propTypes.string,
  isLoading: propTypes.bool,
}

ConfirmationDialog.defaultProps = {
  isOpen: false,
  backButtonTitle: 'Back',
  proceedButtonTitle: 'Proceed',
  proceedColor: 'primary',
  isLoading: false,
}

export default ConfirmationDialog
