import React, { useState } from 'react'
import {
    Box,
    TextField,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
} from '@mui/material'

import SectionHeader from '../../components/common/SectionHeader'
import { STATUS } from '../../constants'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function AdminNewSkill() {
  // error handling already built in TextField
  const navigate = useNavigate()

  const [ skillNameError, setSkillNameError ] = useState(false)
  const [ skillDescError, setSkillDescError ] = useState(false)
  const [ formValues, setFormValues ] = useState({
    "skillName": "",
    "skillDesc": "",
    "skillStatus": STATUS.ACTIVE,
  })


  const handleBackClick = () => {
    navigate(-1)
  }
  
  const updateFormValues = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    // prevent refreshing of page, without this will have warning
    // 'Form submission canceled because the form is not connected'
    e.preventDefault()

    setSkillNameError(false)
    setSkillDescError(false)

    if (formValues.skillName == '' || formValues.skillName.length > 50) {
      setSkillNameError(true)
    }

    if (formValues.skillDesc == '' || formValues.skillDesc.length > 255) {
      setSkillDescError(true)
    }

    // https://stackoverflow.com/questions/52238637/react-router-how-to-pass-data-between-pages-in-react
    if (!(skillNameError || skillDescError)) {
      navigate(
        "/admin/newskill/preview",
        {
          state: formValues
        }
      )
    }

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
        <SectionHeader header="Create new skill" />
        {/* id, name, status, description */}
        <form onSubmit={handleSubmit}>
          <TextField 
            id="skill-name"
            label="Enter skill name"
            helperText={`e.g., Python, Agile, etc. Not more than 50 characters (${formValues.skillName.length}/50)`}
            margin="normal"
            required
            error={skillNameError}
            name="skillName"
            onChange={(e) => {updateFormValues(e)}}
            fullWidth
          />
          <TextField 
            id="skill-desc"
            label="Enter skill description"
            multiline
            rows={4}
            helperText={`Not more than 255 characters (${formValues.skillDesc.length}/255)`}
            margin="normal"
            sx={{ marginBottom: 2 }}
            required
            error={skillDescError}
            name="skillDesc"
            onChange={(e) => {updateFormValues(e)}}
            fullWidth
          />
          <FormLabel 
            id="skill-status-label"
          >
            Status
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="skill-status-label"
            name="skillStatus"
            required
            value={formValues.skillStatus}
            onChange={(e) => {updateFormValues(e)}}
          >
            <FormControlLabel value={STATUS.ACTIVE} control={ <Radio />} label="Active" />
            <FormControlLabel value={STATUS.PENDING}  control={ <Radio />} label="Pending" />
            <FormControlLabel value={STATUS.RETIRED}  control={ <Radio />} label="Retired" />
          </RadioGroup>
          <Button
              variant="outlined"
              sx={{ my: 3, mr: 3 }}
              startIcon={ <KeyboardArrowLeft /> }
              onClick={handleBackClick}
            >
              Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ my: 3 }}
            endIcon={ <KeyboardArrowRight /> }
          >
            Next
          </Button>
        </form>
      </Box>

    </Box>
  )
}


export default AdminNewSkill
