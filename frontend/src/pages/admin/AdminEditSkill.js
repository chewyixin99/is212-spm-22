import { KeyboardArrowRight } from "@mui/icons-material"
import {
    Box,
    Button,
    FormLabel,
    FormControlLabel,
    TextField,
    Typography,
    Radio,
    RadioGroup,
} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import SectionHeader from "../../components/common/SectionHeader"
import SnackbarAlert from "../../components/common/SnackbarAlert"
import DescriptionRows from "../../components/common/DescriptionRows"
import { STATUS, ENDPOINT } from "../../constants"
import { useEffect, useState } from "react"
import { LoadingButton } from "@mui/lab"

function AdminEditSkill() {
  const location = useLocation()
  const navigate = useNavigate()
  const { skillState } = location.state

  const { skillName, skillId, skillDesc, skillStatus } = skillState
  const [ newSkillDesc, setNewSkillDesc ] = useState(skillDesc)
  const [ skillDescError, setSkillDescError ] = useState(false)
  const [ newSkillStatus, setNewSkillStatus ] = useState(skillStatus)
  const [ isLoading, setIsLoading ] = useState(false)

  const [ alertSeverity, setAlertSeverity ] = useState("info")
  const [ alertMessage, setAlertMessage ] = useState("")
  const [ snackbarState, setSnackbarState ] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right'
  })

  // only navigate if success
  useEffect(() => {
    if (alertSeverity == 'success' && snackbarState.open) {
       navigate(-1)
       navigate(
        `/admin/skills/${skillId}`,
        {
          state: {
            snackbarState: snackbarState,
            from: 'AdminEditSkill'
          },
          replace: true
        }
      )
    }
  }, [alertSeverity, snackbarState])

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)
    setSkillDescError(false)

    if (newSkillDesc == '' || newSkillDesc.length > 255) {
        setSkillDescError(true)
    }

    if (!(newSkillDesc.length > 255)) {
        // handle submit
        const requestBody = {
            'status': newSkillStatus,
            'skill_desc': newSkillDesc,
        }
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }
        const url = `${ENDPOINT}/skills/${skillId}`

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((responseJSON) => {
                setIsLoading(false)

                if (responseJSON.code > 399) {
                    setAlertMessage(`Skill ${skillName} does not exist.`)
                    setAlertSeverity("error")
                    setSnackbarState({...snackbarState, open: true})
                } else {
                    setAlertMessage(`Skill ${skillName} successfully updated.`)
                    setAlertSeverity("success")
                    setSnackbarState({...snackbarState, open: true})
                }
            }).catch((e) => {
                setIsLoading(false)
                setAlertMessage(`Internal server error, please try again.`)
                setAlertSeverity("error")
                setSnackbarState({...snackbarState, open: true})
            })
    }

  }

  const handleCancelClick = () => {
    navigate(-1)
  }

  return (
    <Box sx= {{ my: 5 }}>
      <Box
      sx={(theme) => ({
          [theme.breakpoints.up('md')]: {
          width: '50%',
          },
          width: '80%',
          margin: 'auto',
      })}
      >
        <SectionHeader header="Edit skill" />
        <form onSubmit={handleSubmit}>
          {DescriptionRows("Skill ID", skillId)}
          {DescriptionRows("Skill Name", skillName)}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ color: 'text.secondary' }} variant="subtitle1" display="block" gutterBottom>
              Skill description
            </Typography>
            <TextField
              id="skill-desc"
              label="Enter skill description"
              multiline
              rows={4}
              helperText={`Not more than 255 characters (${newSkillDesc.length}/255)`}
              margin="normal"
              sx={{ marginBottom: 2 }}
              required
              error={skillDescError}
              name="skillDesc"
              onChange={(e) => {setNewSkillDesc(e.target.value)}}
              fullWidth
              value={newSkillDesc}
            />
          </Box>
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
            value={newSkillStatus}
            onChange={(e) => {setNewSkillStatus(e.target.value)}}
          >
            <FormControlLabel value={STATUS.ACTIVE} control={ <Radio />} label="Active" />
            <FormControlLabel value={STATUS.PENDING}  control={ <Radio />} label="Pending" />
            <FormControlLabel value={STATUS.RETIRED}  control={ <Radio />} label="Retired" />
          </RadioGroup>
          <Button
            variant="outlined"
            sx={{ my: 3, mr: 3 }}
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ my: 3, mr: 3 }}
            endIcon={ <KeyboardArrowRight /> }
            loading={isLoading}
            loadingPosition="end"
          >
            Confirm
          </LoadingButton>
        </form>
        <SnackbarAlert 
          open={snackbarState.open}
          alertMessage={alertMessage}
          alertSeverity={alertSeverity}
        />
      </Box>
    </Box>
  )
}

export default AdminEditSkill