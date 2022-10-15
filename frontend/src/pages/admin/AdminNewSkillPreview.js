import React, { useState } from 'react'
import {
    Box,
    Typography,
    Button,
} from '@mui/material'

import { LoadingButton } from '@mui/lab'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'

import SectionHeader from '../../components/common/SectionHeader'
import SnackbarAlert from '../../components/common/SnackbarAlert'
import { ENDPOINT } from '../../constants'

function AdminNewSkillPreview() {
  const location = useLocation()
  const navigate = useNavigate()

  const [ isLoading, setIsLoading ] = useState(false)
  const [ alertSeverity, setAlertSeverity ] = useState("info")
  const [ alertMessage, setAlertMessage ] = useState("")
  const [ snackbarState, setSnackbarState ] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right'
  })
  
  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSubmit = (e) => {
    e.preventDefault() // prevent refreshing of page

    setIsLoading(true)

    // requestBody have to be stringified if not POST will return 400 bad request
    const requestBody = {
      'skill_desc': location.state.skillDesc,
      'status': location.state.skillStatus
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }

    const url = `${ENDPOINT}/skills/${location.state.skillName}`

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((responseJSON) => {
        setIsLoading(false)

        if (responseJSON.code > 399) {
          setAlertMessage(`Skill ${location.state.skillName} already exists.`)
          setAlertSeverity("error")
          setSnackbarState({...snackbarState, open: true})
          
        } else {
          setAlertMessage(`Skill ${location.state.skillName} successfully created.`)
          setAlertSeverity("success")
          setSnackbarState({...snackbarState, open: true})
          navigate(
            "/admin/skills",
            {
              state: {
                snackbarState: {
                  open: true,
                  vertical: 'bottom',
                  horizontal: 'right'
                },
                from: 'AdminNewSkillPreview'
              }
            }
          )
        }

      })
      .catch((e) => {
        setIsLoading(false)
        setAlertMessage(`Internal server error, please try again.`)
        setAlertSeverity("error")
        setSnackbarState({...snackbarState, open: true})
      })
  }

  return (
    <Box sx={{ my: 5 }}>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up('md')]: {
            width: '50%',
          },
          width: '80%',
          margin: 'auto',
        })}
      >
        <SectionHeader header="Skill preview" />
        {/* id, name, status, description */}
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ color: 'text.secondary' }} variant="subtitle1" display="block" gutterBottom>
              Skill name
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              {location.state.skillName}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ color: 'text.secondary' }} variant="subtitle1" display="block" gutterBottom>
              Skill description
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              {location.state.skillDesc}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ color: 'text.secondary' }} variant="subtitle1" display="block" gutterBottom>
              Skill status
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              {location.state.skillStatus}
            </Typography>
          </Box>
          <Button
              variant="outlined"
              sx={{ my: 3, mr: 3 }}
              startIcon={ <KeyboardArrowLeft /> }
              onClick={handleBackClick}
            >
              Back
          </Button>
          <LoadingButton
              type="submit"
              variant="contained"
              sx={{ my: 3 }}
              loading={isLoading}
              loadingPosition="end"
              endIcon={ <KeyboardArrowRight /> }
            >
              Submit
          </LoadingButton>
        </form>

        <SnackbarAlert 
          snackbarState={snackbarState}
          alertMessage={alertMessage}
          alertSeverity={alertSeverity}
        />
      </Box>

    </Box>
  )
}


export default AdminNewSkillPreview
