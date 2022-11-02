import React from 'react'
import propTypes from 'prop-types'

import { LoadingButton } from '@mui/lab'
import { Box, Button } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

const BackNextButtons = ({
  handleBackClick,
  handleNextClick,
  disableNextClick,
  isLoading,
  justifyContent,
  backButtonLabel,
  nextButtonLabel,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent,
      }}
    >
      <Button
        variant="outlined"
        sx={{ mr: 3 }}
        startIcon={<KeyboardArrowLeft />}
        onClick={handleBackClick}
      >
        {backButtonLabel}
      </Button>
      <LoadingButton
        variant="contained"
        loading={isLoading}
        loadingPosition="end"
        onClick={handleNextClick}
        endIcon={<KeyboardArrowRight />}
        disabled={isLoading || disableNextClick}
      >
        {nextButtonLabel}
      </LoadingButton>
    </Box>
  )
}

export default BackNextButtons

BackNextButtons.propTypes = {
  handleBackClick: propTypes.func,
  handleNextClick: propTypes.func,
  disableNextClick: propTypes.bool,
  isLoading: propTypes.bool,
  justifyContent: propTypes.string,
  backButtonLabel: propTypes.string,
  nextButtonLabel: propTypes.string,
}

BackNextButtons.defaultProps = {
  disableNextClick: false,
  isLoading: false,
  justifyContent: 'space-between',
  backButtonLabel: 'Back',
  nextButtonLabel: 'Next',
}
