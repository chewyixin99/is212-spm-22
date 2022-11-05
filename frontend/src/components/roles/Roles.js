import React, { useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { Alert, Box, Breadcrumbs, Stack, Typography } from '@mui/material'
import { ENDPOINT, ROLES, STATUS } from '../../constants'
import editRoleService from '../../services/roles/editRoleService'
import StyledBreadcrumb from '../common/StyledBreadcrumb'
import DescriptionRow from '../common/DescriptionRow'
import ConfirmationDialog from '../common/ConfirmationDialog'
import useDialogState from '../../services/common/useDialogState'
import EditButtons from '../common/EditButtons'
import BackNextButtons from '../common/BackNextButtons'

function Roles() {
  const { role: userCurrentRole } = useOutletContext()
  const { role_id } = useParams()
  const baseUrl = ENDPOINT
  const [role, setRole] = React.useState([])
  const [roleSkills, setRoleSkills] = React.useState([])
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const deleteDialogState = useDialogState()

  React.useEffect(() => {
    const fetchData = async () => {
      await fetch(`${baseUrl}/roles/${role_id}`)
        .then((results) => results.json())
        .then((data) => {
          setRole(data.data)
        })
      await fetch(`${baseUrl}/roles/${role_id}/skills`)
        .then((results) => results.json())
        .then((data) => {
          setRoleSkills(data.data.skills)
        })
    }
    fetchData().catch(console.error)
  }, [])

  const renderAlertMessage = (status) => {
    if (status === STATUS.RETIRED) {
      return (
        <Alert severity="error">
          This role is no longer available for assignment.
        </Alert>
      )
    } else if (status === STATUS.PENDING) {
      return <Alert severity="warning">This role is pending approval.</Alert>
    }
    return (
      <Alert severity="info">
        This role is currently available for assignment.
      </Alert>
    )
  }

  // filter for breadcrumbs
  const checkActive = () => {
    return role.status === STATUS.ACTIVE
  }

  const renderRoleSkills = () => {
    if (roleSkills.filter(checkActive).length > 0) {
      return (
        <Stack>
          <Typography
            sx={{ color: 'text.secondary' }}
            variant="subtitle1"
            display="block"
            gutterBottom
          >
            Skills under role
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            {roleSkills.filter(checkActive).map((skill) => (
              <StyledBreadcrumb>
                {/* to add link to the course page */}
                {skill.skill_name}
              </StyledBreadcrumb>
            ))}
          </Breadcrumbs>
        </Stack>
      )
    } else {
      return (
        <Typography
          sx={{ color: 'text.secondary' }}
          variant="subtitle1"
          display="block"
          gutterBottom
        >
          There are no active skills under this role yet.
        </Typography>
      )
    }
  }

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleEditClick = () => {
    navigate(`/admin/roles/${role.role_id}/edit`, {
      state: {
        roleState: {
          roleName: role.role_name,
          roleDept: role.role_dept,
          roleDesc: role.role_desc,
          roleId: role.role_id,
          roleStatus: role.status,
        },
        from: 'Roles',
      },
    })
  }

  const handleConfirmRetireClick = async () => {
    setIsLoading(true)
    editRoleService({
      roleId: role?.role_id,
      roleStatus: STATUS.RETIRED,
    })
      .then((response) => {
        if (response?.data) {
          enqueueSnackbar('Role successfully retired.', { variant: 'success' })
        } else {
          const errorMsg = response?.error
            ? response?.error
            : 'Unable to retire role. Please try again.'
          enqueueSnackbar(errorMsg, { variant: 'error' })
        }
      })
      .then(() => {
        setIsLoading(false)
        navigate('/admin/roles', {
          replace: true,
        })
        deleteDialogState.close()
      })
  }

  const renderActionButtons = () => {
    if (userCurrentRole === ROLES.STAFF) {
      return (
        <BackNextButtons
          handleBackClick={handleBackClick}
          handleNextClick={() => {
            navigate('/staff/learning-journey/new', {
              state: {
                roleState: {
                  roleName: role.role_name,
                  roleDept: role.role_dept,
                  roleDesc: role.role_desc,
                  roleId: role.role_id,
                  roleStatus: role.status,
                },
              },
            })
          }}
          nextButtonLabel="Create Learning Journey"
          disableNextClick={
            role.status === STATUS.RETIRED || role.status === STATUS.PENDING
          }
        />
      )
    }
    return (
      <EditButtons
        handleBackClick={handleBackClick}
        handleEditClick={handleEditClick}
        handleDeleteClick={deleteDialogState.open}
      />
    )
  }

  return (
    <Box sx={{ width: '50%', margin: 'auto' }}>
      <Typography
        variant="h3"
        noWrap
        component="a"
        sx={{
          mr: 2,
          my: 3,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      />
      <Box sx={{ marginBottom: '10vh', justifyContent: 'center' }}>
        <Typography variant="h4" component="div" gutterBottom>
          {role.role_name}
        </Typography>
        <Stack spacing={4} sx={{ marginTop: '5vh', marginBottom: '10vh ' }}>
          {renderAlertMessage(role.status)}
          {renderRoleSkills()}
          <DescriptionRow title="Role ID" value={role.role_id?.toString()} />
          <DescriptionRow title="Role Name" value={role.role_name} />
          <DescriptionRow title="Role Department" value={role.role_dept} />
          <DescriptionRow title="Role Description" value={role.role_desc} />
          <DescriptionRow title="Role Status" value={role.status} />
          {renderActionButtons()}
        </Stack>
      </Box>
      <ConfirmationDialog
        dialogTitle="Retire role?"
        dialogBody={`This action will retire the ${role?.role_name} role.
        Learning journeys that are dependent on this role will be notified
        of the retirement of this role.`}
        isOpen={deleteDialogState.isOpen}
        closeCallback={deleteDialogState.open}
        backCallback={deleteDialogState.close}
        proceedCallback={handleConfirmRetireClick}
        proceedButtonTitle="Retire"
        proceedColor="error"
        isLoading={isLoading}
      />
    </Box>
  )
}

export default Roles
