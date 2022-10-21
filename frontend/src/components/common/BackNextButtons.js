import React from 'react'
import propTypes from 'prop-types'

import { LoadingButton } from '@mui/lab'
import { Box, Button } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'

const BackNextButtons = ({
  handleBackClick,
  handleNextClick,
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
      {/* <Button
        variant="contained"
        endIcon={<KeyboardArrowRight />}
        onClick={handleNextClick}
      >
        {nextButtonLabel}
      </Button> */}
      <LoadingButton
        variant="contained"
        loading={isLoading}
        loadingPosition="end"
        onClick={handleNextClick}
        endIcon={<KeyboardArrowRight />}
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
  isLoading: propTypes.bool,
  justifyContent: propTypes.string,
  backButtonLabel: propTypes.string,
  nextButtonLabel: propTypes.string,
}

BackNextButtons.defaultProps = {
  isLoading: false,
  justifyContent: 'space-between',
  backButtonLabel: 'Back',
  nextButtonLabel: 'Next',
}
